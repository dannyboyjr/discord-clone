import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { createMessageInChannel, getAllMessagesInChannel } from '../../../store/messages';
import { useParams } from 'react-router-dom';
import './ChatInput.css';

let socket

function ChatInput() {
  const {serverId, channelId } = useParams()
  const [content, setContent] = useState("")
  const messageState = useSelector((state) => state.messages);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  // const messagesState = useSelector((state) => state.messages);


// const handleSubmit = () => {
//     dispatch(createMessageInChannel(serverId, channelId, { content }));
//     setContent("")
//   }

useEffect(() => {

  // create websocket/connect
  socket = io();

  socket.on("chat", ({ content }) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!hey there!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(content)
    console.log('------------------')
    dispatch(getAllMessagesInChannel(serverId, channelId))
    // when we recieve a chat, add it into our messages array in state
    // messageState
    // setMessages(messages => [...messages, chat])
})

  // when component unmounts, disconnect
  return (() => {
      socket.disconnect()
  })
}, [])

const handleSubmit = () => {
  dispatch(createMessageInChannel(serverId, channelId, { content })); // figure out proper callback to return data from createMessageInChannel
  console.log(content)
  socket.emit("chat", { content, user: user.username });
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
