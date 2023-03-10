import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllMessagesInChannel } from '../../../store/channels';
import MessageCard from './MessageCard/MessageCard'
import './Messages.css';

const Messages = () => {
  const { serverId, channelId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.channels[channelId]?.messages || {});
  const messagesArr = Object.values(messages)
  

  useEffect(() => {
    dispatch(getAllMessagesInChannel(serverId, channelId)).then(()=> setIsLoaded(true)).then(console.log(messagesArr))
  }, [dispatch, serverId, channelId]);

  return (
    <div className="messages-container">
      <h2>Messages</h2>
       
        <ul>
           {isLoaded && messagesArr.map((message) => (
            <MessageCard message={message} />
          ))}
          </ul>
    </div>
  );
};

export default Messages;