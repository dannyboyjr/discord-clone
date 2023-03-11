import React from 'react';
import { useParams } from 'react-router-dom';
import DmChannels from './DmChannels/DmChannels'
import DmMessages from './DmMessages/DmMessages';
import DmChatInput from './DmChatInput';

const MainDm = () => {
  const {channelId } = useParams();

  return (
    <div>
      <DmChannels />
      <div>
        <DmMessages/>
        {channelId && <DmChatInput />}
      </div>
    </div>
  );
};

export default MainDm;