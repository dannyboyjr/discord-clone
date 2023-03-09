import React from 'react';
import './ChatInput.css';

function ChatInput() {
  return (
    <div className="chat-input-container">
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );
}

export default ChatInput;
