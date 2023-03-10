import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerById, deleteServerById } from '../../../store/servers';
import { getAllChannelsInServer } from '../../../store/channels';
import ChannelsCard from './ChannelsCard/ChannelsCard';
import './Channels.css';

function Channels({ serverId }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const currentServer = useSelector((state) => state.servers.serverById);
  const channels = useSelector((state) => state.channels);
  const channelsArr = Object.values(channels);

  useEffect(() => {
    if (serverId) {
      const selectedServerId = serverId;
      dispatch(getServerById(selectedServerId));
      dispatch(getAllChannelsInServer(selectedServerId)).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [dispatch, serverId]);

  const handleDelete = () => {
    dispatch(deleteServerById(currentServer.id)).then(() => {});
  };

  return (
    <div className="channels-container">
      {!serverId && !serverId && <div>Select a server</div>}
      {serverId ? (
        <>
          <div className="server-info-container">
            <div className="server-icons-container">
              <h2>{currentServer.name}</h2>
              <span className="edit-icon">
                <i className="fa fa-pencil"></i>
              </span>
              <span className="delete-icon" onClick={handleDelete}>
                <i className="fa fa-times"></i>
              </span>
            </div>
          </div>

          <ul>
            {isLoaded &&
              channelsArr.map((channel) => (
                <ChannelsCard key={channel.id} channel={channel} serverId={serverId} />
              ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default Channels;