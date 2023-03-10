import React, { useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getServerById, deleteServerById } from '../../../store/servers'
import { getAllChannelsInServer } from '../../../store/channels';
import ChannelsCard from './ChannelsCard/ChannelsCard';
import './Channels.css';

function Channels() {
    const [isLoaded, setIsLoaded] = useState(false)
    const {serverId } = useParams()
    const history = useHistory();


    const dispatch = useDispatch();
    const currentServer = useSelector(state => state.servers.serverById)
    const channels = useSelector(state => state.channels)
    const channelsArr = Object.values(channels);
    useEffect(() => {
        dispatch(getServerById(serverId))
        dispatch(getAllChannelsInServer(serverId)).then(() => setIsLoaded(true))
        
    }, [dispatch, serverId])

    const handleDelete = () => {
      dispatch(deleteServerById(currentServer.id)).then(() => {
        history.push('/');
      });
      
    } 


  return (

    <div className="channels-container">

       <div className="server-info-container">
          
          <div className='server-icons-container'>
          <h2>{currentServer.name}</h2>
             <span className="edit-icon"><i className="fa fa-pencil"></i></span>
            <span className="delete-icon" onClick={handleDelete}><i className="fa fa-times"></i></span>
          </div>
      </div>

      <ul>
        {isLoaded && channelsArr.map((channel)=>(
    <ChannelsCard key={channel.id} channel={channel} serverId={serverId} />
))}
      </ul>
    </div>
  );
}

export default Channels;