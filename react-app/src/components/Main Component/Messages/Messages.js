import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllMessagesInChannel } from '../../../store/messages';
import MessageCard from './MessageCard/MessageCard'
import './Messages.css';

const Messages = () => {
  const { serverId, channelId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();
  const messagesState = useSelector((state) => state.messages);
  console.log('!!!!!!!!!!!!!!!!!!', messagesState, '!!!!!!!!!!!!!!!!!!')
  // const messages = messagesState[1] || {}
  // const messages = messagesState[channelId]?.messages || {}
  const messagesArr = Object.values(messagesState)



  useEffect(() => {
    if(serverId && channelId){
      dispatch(getAllMessagesInChannel(serverId, channelId)).then(()=> setIsLoaded(true))
    } else {
       setIsLoaded(true)
     }
  }, [dispatch, serverId, channelId]);

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      {serverId && channelId ? (
        <ul>
          {isLoaded && messagesArr.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </ul>
      ) : (
        <div>Select a server.</div>
      )}
    </div>
  );
};

export default Messages;
