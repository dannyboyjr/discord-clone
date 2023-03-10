import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessageInChannel } from '../../../store/channels';
import { useParams } from 'react-router-dom';
import './ChatInput.css';

function ChatInput() {
  const {serverId, channelId } = useParams()
  const [content, setContent] = useState("")
  const dispatch = useDispatch();

  
  return (
    <div className="chat-input-container">
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );
}

export default ChatInput;
