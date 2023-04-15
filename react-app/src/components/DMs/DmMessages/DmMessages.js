import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getAllMessagesInChannel } from '../../../store/messages'
import MessageCard from '../../Main Component/Messages/MessageCard/MessageCard'
import '../../Main Component/Messages/Messages.css';

const DmMessages = () => {
  const { serverId, channelId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();
  const dms = useSelector((state) => state.messages);
  const dmsArr = Object.values(dms)


  useEffect(() => {
    if(serverId && channelId){
      dispatch(getAllMessagesInChannel(serverId, channelId)).then(()=> setIsLoaded(true))
    } else {
      setIsLoaded(true)
    }
  }, [dispatch, serverId, channelId]);
  return (

    <div className="messages-container">

      <h2>Direct Messages</h2>

      {serverId && channelId && (
        <ul>
          {isLoaded && dmsArr.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DmMessages;
