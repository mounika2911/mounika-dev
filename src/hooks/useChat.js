import { useState, useRef, useEffect } from 'react';
import { AI_SYSTEM_PROMPT } from '../constants/data.js';

// ============================================================
// useChat — all chat state and API logic in one hook
// ============================================================

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! ✦ I'm Mounika's AI assistant. Ask me anything — projects, experience, tech stack, or how to get in touch!",
};

export const useChat = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const assistantIndexRef = useRef(-1);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    const joinWithSpacing = (currentContent, piece) => {
      if (!piece) return currentContent;
      return currentContent + piece;
    };

  const sendMessage = async (text) => {
    return sendMessageStream(text);
  };

  const sendMessageStream = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg = { role: 'user', content };

    setMessages((prev) => {
      const next = [...prev, userMsg, { role: 'assistant', content: '' }];
      assistantIndexRef.current = next.length - 1;
      return next;
    });

    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch('http://localhost:3001/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: AI_SYSTEM_PROMPT, messages: history }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to stream response');
      }

      if (!response.body) {
        throw new Error('No streaming body available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const segments = buffer.split(/\r?\n\r?\n/);
        buffer = segments.pop(); // keep partial

        for (const segment of segments) {
          const line = segment.trim();
          if (!line.startsWith('data:')) continue;

          const payload = line.replace(/^data:(?: |\t)?/, '');
          if (!payload || payload === '[DONE]') {
            continue;
          }

          let piece = payload;
          try {
            const parsed = JSON.parse(payload);
            piece = parsed.choices?.[0]?.delta?.content || '';
          } catch (e) {
            // not JSON, keep raw text
          }

          if (!piece) continue;

          setMessages((prev) => {
            const updated = [...prev];
            const aiIndex = assistantIndexRef.current;
            if (aiIndex >= 0 && aiIndex < updated.length) {
              const currentContent = updated[aiIndex].content || '';
              updated[aiIndex] = {
                ...updated[aiIndex],
                content: joinWithSpacing(currentContent, piece),
              };
            } else {
              // fallback to last assistant in case index mismatch
              const fallbackIndex = updated.map((m) => m.role).lastIndexOf('assistant');
              if (fallbackIndex !== -1) {
                const currentContent = updated[fallbackIndex].content || '';
                updated[fallbackIndex] = {
                  ...updated[fallbackIndex],
                  content: joinWithSpacing(currentContent, piece),
                };
              }
            }
            return updated;
          });
        }
      }

      if (buffer.trim()) {
        const finalText = buffer.trim();
        setMessages((prev) => {
          const updated = [...prev];
          const aiIndex = assistantIndexRef.current;
          if (aiIndex >= 0 && aiIndex < updated.length) {
            const currentContent = updated[aiIndex].content || '';
            updated[aiIndex] = {
              ...updated[aiIndex],
              content: joinWithSpacing(currentContent, finalText),
            };
          } else {
            const fallbackIndex = updated.map((m) => m.role).lastIndexOf('assistant');
            if (fallbackIndex !== -1) {
              const currentContent = updated[fallbackIndex].content || '';
              updated[fallbackIndex] = {
                ...updated[fallbackIndex],
                content: joinWithSpacing(currentContent, finalText),
              };
            }
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Chat stream error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessage,
    sendMessageStream,
    messagesEndRef,
    inputRef,
  };
};

