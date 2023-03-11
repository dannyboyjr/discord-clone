import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import OpenModalButton  from '../../../OpenModalButton'
import EditChannelModal  from '../../../EditChannelModal'
import OpenModalImage  from '../../../OpenModalImage/index'

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

            <div className='channel-card-edit'>
            <OpenModalImage
                buttonText="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Font_Awesome_5_regular_edit.svg/1200px-Font_Awesome_5_regular_edit.svg.png"
                modalComponent={<EditChannelModal channel={channel} />}
                />
        </div>
          </div>
          
        </NavLink>

      )}
      
    </div>
  )

}

export default ChannelsCard

