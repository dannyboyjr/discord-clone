import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllChannelsInServer } from '../../../store/channels'
import './Channels.css';

function Channels() {
    const [isLoaded, setIsLoaded]  = useState(false)
    const {serverId } = useParams()
    const dispatch = useDispatch();
    const channels = useSelector(state => state.channels.allChannels)
    const channelsArr = Object.values(channels);
    useEffect(() => {
        dispatch(getAllChannelsInServer(serverId)).then(() => setIsLoaded(true))
        
    }, [dispatch, serverId])

  return (
    <div className="channels-container">
      <h2>Channels</h2>
      <ul>
        {isLoaded && channelsArr.map((channel)=>{
            <li key={channel.id}>{channel.name}</li>
        })}
      </ul>
    </div>
  );
}

export default Channels;