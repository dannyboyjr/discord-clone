import React from 'react';
import { useParams } from 'react-router-dom';
import Channels from './Channels/Channels'
import Messages from './Messages/Messages';
import ChatInput from './ChatInput/ChatInput';
import ProfileCard from '../ProfileCard/ProfileCard';
const MainComponent = () => {
  const { serverId, channelId } = useParams();

  return (
    <div>
      <Channels serverId={serverId} channelId={serverId}/>
      <div>
        <Messages/>
        {channelId && <ChatInput />}
      </div>
      <ProfileCard />
    </div>
    
  );
};

export default MainComponent;
