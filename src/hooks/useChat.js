import { useState, useRef, useEffect } from 'react';
import { AI_SYSTEM_PROMPT } from '../constants/data.js';

// ============================================================
// useChat — calls Groq API directly
// ============================================================

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! ✦ I'm Mounika's AI assistant. Ask me anything — projects, experience, tech stack, or how to get in touch!",
};

export const useChat = () => {
  const [messages, setMessages]   = useState([INITIAL_MESSAGE]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const messagesEndRef             = useRef(null);
  const inputRef                   = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageStream = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Call Groq API directly
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: AI_SYSTEM_PROMPT }, ...history],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      let errorMessage = 'Oops, something went wrong. ';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Check your internet connection.';
      } else {
        errorMessage += error.message || 'Please try again!';
      }
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    sendMessageStream,
    messagesEndRef,
    inputRef,
  };
};

