import { useEffect } from 'react';
import { useChat } from '../hooks/useChat.js';
import Button from './ui/Button.jsx';
import { SparkleIcon, SendIcon, CloseIcon } from '../assets/icons/index.jsx';
import './ChatPanel.css';

// ============================================================
// CHAT PANEL + FAB
// ============================================================

const SUGGESTIONS = [
  "What's your email?",
  "Tell me about projects",
  "Tech stack?",
  "Current employer?",
];

// Floating action button — shown when chat is closed
export const ChatFab = ({ onClick }) => (
  <button className="chat-fab" onClick={onClick} aria-label="Open AI chat">
    <SparkleIcon size={15} />
    Ask AI About Me
  </button>
);

// Full chat panel
const ChatPanel = ({ onClose }) => {
  const {
    messages, input, setInput,
    loading, sendMessageStream,
    messagesEndRef, inputRef,
  } = useChat();

  // Focus input when panel opens
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const handleSuggestion = (text) => {
    sendMessageStream(text);
  };

  return (
    <div className="chat-panel">

      {/* Header */}
      <div className="chat-panel__header">
        <div className="chat-panel__header-left">
          <div className="chat-panel__avatar">✦</div>
          <div>
            <p className="chat-panel__name">AI Assistant</p>
            <p className="chat-panel__powered">Powered by Groq (Llama 3)</p>
          </div>
        </div>
        <button className="chat-panel__close" onClick={onClose} aria-label="Close chat">
          <CloseIcon size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-panel__messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-msg chat-msg--${m.role}`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="chat-msg chat-msg--assistant chat-msg--loading">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions */}
      <div className="chat-panel__suggestions">
        {SUGGESTIONS.map(q => (
          <button
            key={q}
            className="chat-panel__chip"
            onClick={() => handleSuggestion(q)}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="chat-panel__input-row">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessageStream()}
          placeholder="Ask me anything..."
          className="chat-panel__input"
        />
        <button
          className="chat-panel__send"
          onClick={() => sendMessageStream()}
          disabled={loading || !input.trim()}
          aria-label="Send"
        >
          <SendIcon size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
