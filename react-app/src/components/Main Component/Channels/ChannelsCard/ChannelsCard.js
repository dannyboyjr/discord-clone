import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { deleteChannelById } from '../../../../store/channels';
import OpenModalImage  from '../../../OpenModalImage'
import EditChannelModal  from '../../../EditChannelModal'
import EditIconImg from '../../../../assets/pencil.png'
import DeleteImg from '../../../../assets/delete.png'

const ChannelsCard = ({ channel, serverId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { channelId } = useParams()
    const currentUser = useSelector((state) => state.session.user)
    const serverChannels = useSelector(state => state.channels);
    const channelsArr = Object.values(serverChannels)

    const isOwner = currentUser.id === channel.owner_id
    const currentChannel = parseInt(channelId) === channel.id

    const handleDelete = () => {
        console.log('channel.server_id:', channel.server_id, 'channel.id:', channel.id)
        if (channelsArr.length > 1){
        return dispatch(deleteChannelById(channel.server_id, channel.id )).then(() => history.push(`/${serverId}`))

    }
        else {
            return window.alert('Cannot delete a channel from a server with only one channel')
        }

    };

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
        <NavLink className='channel-card' activeClassName='active-channel' to={`/${serverId}/${channel.id}/`}>
          <div className='channel-line'>
            <li className='channel-line-name' key={channel.id}>#{channel.name}</li>

            <div className='channel-line-tools'>
            {isOwner && currentChannel && <div className='channel-edit-btn'>
            <OpenModalImage
                buttonText={EditIconImg}
                modalComponent={<EditChannelModal channel={channel} />}
                />
            </div>}
            {isOwner && currentChannel && <div className="channel-delete-icon" onClick={handleDelete}>
                <img src={DeleteImg} alt="delete"/>
            </div>}
            </div>
          </div>

        </NavLink>

      )}

    </div>
  )

}

export default ChannelsCard
