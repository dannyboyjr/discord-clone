import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import OpenModalButton  from '../../../OpenModalButton'
import EditChannelModal  from '../../../EditChannelModal'


const ChannelsCard = ({ channel, serverId }) => {

return (
    <div>
      {/* Conditionally render a NavLink or a regular link based on the private property */}
      {channel.private ? (

        <NavLink className='channel-card' to={`/@me/${serverId}/${channel.id}/`}>
        <div className='channel-line'>
        #<li key={channel.id}>{channel.name}</li>
        </div>
    </NavLink>

      ) : (
        <NavLink className='channel-card' to={`/${serverId}/${channel.id}/`}>
          <div className='channel-line'>
            #<li key={channel.id}>{channel.name}</li>
          </div>
        </NavLink>
      )}

      {/* Uncomment the following code to use the OpenModalButton */}
      {/* <div>
        <OpenModalButton
          buttonText='E'
          modalComponent={<EditChannelModal channel={channel} />}
        />
      </div> */}
    </div>
  )

}

export default ChannelsCard

