import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteChannelById } from '../../../../store/channels';
import OpenModalImage  from '../../../OpenModalImage'
import EditChannelModal  from '../../../EditChannelModal'


const ChannelsCard = ({ channel, serverId }) => {
console.log({channel})
    const dispatch = useDispatch()
    const serverChannels = useSelector(state => state.channels);
    const channelsArr = Object.values(serverChannels)

    const handleDelete = () => {
        if (channelsArr.length > 1){
        dispatch(deleteChannelById(channel.server_id, channel.id )).then(() => {
        })}
        else {
            return window.alert('Cannot delete a channel from a server with only one channel')
        }

    };

    return (
        <div className='channel-card'>

        <NavLink className='channel-card-name' to={`/${serverId}/${channel.id}/`}>
            <div className='channel-line'>
            #<li key={channel.id}>{channel.name}</li>
            </div>
        </NavLink>

        <div className='channel-card-edit'>
            <OpenModalImage
                buttonText="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Font_Awesome_5_regular_edit.svg/1200px-Font_Awesome_5_regular_edit.svg.png"
                modalComponent={<EditChannelModal channel={channel} />}
                />
        </div>
        <span className="delete-icon" onClick={handleDelete}>
                <i className="fa fa-times"></i>
        </span>


    </div>
    )

}

export default ChannelsCard
