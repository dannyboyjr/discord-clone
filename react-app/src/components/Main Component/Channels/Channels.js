import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerById, deleteServerById } from '../../../store/servers';
import { getAllChannelsInServer } from '../../../store/channels';
import OpenModalImage  from '../../OpenModalImage';
import EditServerModal  from '../../EditServerModal';
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
    dispatch(deleteServerById(currentServer.id)).then(() => {
      // history.push('/@me')    This must redirect to user's dms, double check the route with dan
    });
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
               <div className='server-card-pic add-server-pic'>
                 <OpenModalImage
                   buttonText="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Font_Awesome_5_regular_edit.svg/1200px-Font_Awesome_5_regular_edit.svg.png"
                   modalComponent={<EditServerModal server={currentServer}/>}
                 />
        	     </div>
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
