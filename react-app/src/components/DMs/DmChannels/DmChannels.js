import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../../Navigation/ProfileButton'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPrivateChannelsOfUser  } from '../../../store/dms'
import ChannelsCard from '../../Main Component/Channels/ChannelsCard/ChannelsCard'
import '../../Main Component/Channels/Channels.css';

function DmChannels() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const dmChannels = useSelector(state => state.dms)
  const dmCHannelsArr = Object.values(dmChannels)


  useEffect(() => {
    dispatch(getAllPrivateChannelsOfUser()).then(() => setIsLoaded(true));
    
  }, [dispatch])

  return (
    <div className="channels-container">


        <>
          <div className="server-info-container">
            <div className="server-icons-container">
              <h2>Direct Messages</h2>
            </div>
          </div>

          <ul>
            {isLoaded &&
              dmCHannelsArr.map((channel) => (

                <ChannelsCard key={channel.id} channel={channel} serverId={channel.server_id} />
              ))}
          </ul>
        </>
     

      {/* profile card */}
      <div userName="profile-card" >
      <ul>
				{isLoaded && (
						<ProfileButton user={sessionUser} />
				)}
			</ul>
    </div>

    </div>
  );
}

export default DmChannels;