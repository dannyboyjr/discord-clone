import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDirectMessage } from '../../store/dms';
import { useParams } from 'react-router-dom';
import '../Main Component/ChatInput/ChatInput.css'

function DmChatInput() {
  const {serverId, channelId } = useParams()
  const [content, setContent] = useState("")
  const dispatch = useDispatch();

const handleSubmit = () => {
    dispatch(createDirectMessage(serverId, channelId, { content }));
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

export default DmChatInput;