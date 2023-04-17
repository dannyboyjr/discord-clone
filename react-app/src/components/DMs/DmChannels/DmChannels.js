import React, { useState, useEffect } from 'react';
// import ProfileButton from '../../Navigation/ProfileButton'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPrivateChannelsOfUser  } from '../../../store/dms'
import ChannelsCard from '../../Main Component/Channels/ChannelsCard/ChannelsCard'
import '../../Main Component/Channels/Channels.css';
import OpenModalImage from '../../OpenModalImage/index';
import CreateDMModal from '../../CreateDMModal/CreateDMModal'
import AddImg from '../../../assets/evenSmallerPlus.png'
import './DmChannels.css'

function DmChannels() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  // const sessionUser = useSelector(state => state.session.user);
  const dmChannels = useSelector(state => state.dms)
  const dmChannelsArr = Object.values(dmChannels)

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
                buttonText={AddImg}
                modalComponent={<CreateDMModal channels={dmChannelsArr} />} />

        </div>




          <ul className='dm-channels' >
            {isLoaded &&
              dmChannelsArr.map((channel) => (

                <ChannelsCard key={channel.id} channel={channel} serverId={channel.server_id} />
              ))}
          </ul>
        </>

    </div>
  );
}

export default DmChannels;
