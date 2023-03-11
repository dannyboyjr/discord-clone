import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from '../../Navigation/ProfileButton'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPrivateChannelsOfUser  } from '../../../store/dms'
import ChannelsCard from '../../Main Component/Channels/ChannelsCard/ChannelsCard'
import '../../Main Component/Channels/Channels.css';
import OpenModalImage from '../../OpenModalImage/index';
import CreateDMModal from '../../CreateDMModal/CreateDMModal'

function DmChannels() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const dmChannels = useSelector(state => state.dms)
  const dmCHannelsArr = Object.values(dmChannels)

  const handleSubmit = () => {
    console.log("This worked")
  }

  useEffect(() => {
    dispatch(getAllPrivateChannelsOfUser()).then(() => setIsLoaded(true));
    
  }, [dispatch])

  return (
    <div className="channels-container">


        <>
        <div onClick={handleSubmit} className="direct-messages-container">

        <h2>Direct Messages</h2>
        <OpenModalImage
                buttonText="https://commons.wikimedia.org/wiki/File:Noun_project_-_plus_round.svg#/media/File:Noun_project_-_plus_round.svg"
                modalComponent={<CreateDMModal />} />
        
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