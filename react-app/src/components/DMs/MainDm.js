import React from 'react';
import { useParams } from 'react-router-dom';
import DmChannels from './DmChannels/DmChannels'
import Messages from '../Main Component/Messages/Messages';
import ChatInput from '../Main Component/ChatInput/ChatInput';

const MainDm = () => {
  const {channelId } = useParams();

  return (
    <div>
      <DmChannels />
      <div>
        <Messages/>
        {channelId && <ChatInput />}
      </div>
    </div>
  );
};

export default MainDm;