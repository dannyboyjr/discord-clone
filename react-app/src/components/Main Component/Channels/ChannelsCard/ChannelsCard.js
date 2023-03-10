import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import OpenModalButton  from '../../../OpenModalButton'
import EditChannelModal  from '../../../EditChannelModal'


//{serverId}/${channel.id}/
const ChannelsCard = ({ channel, serverId }) => {


    return (
        <div>

        <NavLink className='channel-card' to={`/${serverId}/${channel.id}/`}>
        <li key={channel.id}>{channel.name}</li>
        </NavLink>

        <div>
            <OpenModalButton
                buttonText="E"
                modalComponent={<EditChannelModal channel={channel} />}
                />
        </div>


    </div>
    )

}

export default ChannelsCard
