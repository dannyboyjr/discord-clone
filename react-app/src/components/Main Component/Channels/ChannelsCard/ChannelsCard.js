import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'


//{serverId}/${channel.id}/
const ChannelsCard = ({ channel, serverId }) => {

    return (

        <NavLink className='channel-card' to={`/${serverId}/${channel.id}/`}> 
        <li key={channel.id}>{channel.name}</li>
    </NavLink>
    )
}

export default ChannelsCard