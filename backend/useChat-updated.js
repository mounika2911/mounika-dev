import { useState, useRef, useEffect } from 'react';
import { AI_SYSTEM_PROMPT } from '../constants/data.js';

// ============================================================
// useChat — calls your backend API instead of Anthropic directly
// ============================================================

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! ✦ I'm Mounika's AI assistant. Ask me anything — projects, experience, tech stack, or how to get in touch!",
};

// Backend URL - change this if your backend runs on a different port
// const BACKEND_URL = 'http://localhost:3001';

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

  const sendMessage = async (text) => {
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

      // Call YOUR backend instead of Anthropic directly
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions/api/chat', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          messages: history,
          system: AI_SYSTEM_PROMPT,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const reply = data.content?.map(b => b.text || '').join('') || 'Sorry, something went wrong.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      let errorMessage = 'Oops, something went wrong. ';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Make sure the backend server is running on port 3001.';
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
    sendMessage,
    messagesEndRef,
    inputRef,
  };
};
