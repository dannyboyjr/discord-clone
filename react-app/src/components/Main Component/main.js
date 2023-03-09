import React from 'react';
import Channels from './Channels/Channels'
import Messages from './Messages/Messages';
import ChatInput from './ChatInput/ChatInput';

const MainComponent = () => {
    return (
        <div>
            <Channels />
            <div>
                <Messages />
                <ChatInput />
            </div>
        </div>
    );
};

export default MainComponent;