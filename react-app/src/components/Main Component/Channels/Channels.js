import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerById, deleteServerById, leaveServerById } from '../../../store/servers';
import { getAllChannelsInServer } from '../../../store/channels';
import OpenModalImage  from '../../OpenModalImage';
import CreateChannelModal  from '../../CreateChannelModal';
import EditServerModal  from '../../EditServerModal';
import ChannelsCard from './ChannelsCard/ChannelsCard';
import './Channels.css';
import leaveArrowIcon from '../../../assets/leave_arrow.png'
import AddIcon from '../../../assets/evenSmallerPlus.png'
import EditIconImg from '../../../assets/pencil.png'
import DeleteImg from '../../../assets/delete.png'



function Channels({ serverId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user)
  const currentServer = useSelector((state) => state.servers.serverById);
  const channels = useSelector((state) => state.channels);
  const channelsArr = Object.values(channels);
  const { channelId } = useParams();

  const isOwner = currentUser.id === currentServer.owner_id

  useEffect(() => {
    if (serverId) {
      const selectedServerId = serverId;
      dispatch(getServerById(selectedServerId));
      dispatch(getAllChannelsInServer(selectedServerId)).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [dispatch, serverId, channelId]);

  if (isLoaded && !channelId){
    return <Redirect to={`/${serverId}/${channelsArr[0].id}`}></Redirect>
  }



  const handleDelete = () => {
    dispatch(deleteServerById(currentServer.id))
    history.push('/@me');
  };

  const handLeave = () => {
    dispatch(leaveServerById(serverId))
     history.push('/@me')
    }



  return (
    <div className="channels-container">
      {!serverId && !serverId && <div>Select a server</div>}
      {serverId ? (
        <>
          <div className="server-info-container">
            <div className="server-header-container">
              <h2>{currentServer.name}</h2>
              <div className='server-header-tools'>
              {isOwner && <div className='create-channel-btn'>
          <OpenModalImage
                   buttonText={AddIcon}
                   modalComponent={<CreateChannelModal serverId={currentServer.id}/>}
                 />
          </div>}
          {!isOwner &&
          <div className="leave-channel-icon" onClick={handLeave}>
          <img src={leaveArrowIcon} alt="leave" />
        </div>
        }
              {isOwner && <span className="edit-icon">
               <div className=''>
                 <OpenModalImage
                   buttonText={EditIconImg}
                   modalComponent={<EditServerModal server={currentServer}/>}
                 />
        	     </div>
              </span>}
              {isOwner && <span className="delete-icon" onClick={handleDelete}>
                <img src={DeleteImg} alt="delete" />
              </span>}
              </div>
            </div>
          </div>

          <ul className='channel-card-container'>
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
