import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessageInChannel } from '../../../store/channels';
import { useParams } from 'react-router-dom';
import './ChatInput.css';

function ChatInput() {
  const {serverId, channelId } = useParams()
  const [content, setContent] = useState("")
  const dispatch = useDispatch();

const handleSubmit = () => {
    dispatch(createMessageInChannel(serverId, channelId, { content }));
    setContent("")
  }

const sendWithEnter = (e) => {
  if(e.key === "Enter") handleSubmit()
}

  return (
    <div className="chat-input-container">
      <input 
        type="text" 
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={sendWithEnter}
        />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default ChatInput;
