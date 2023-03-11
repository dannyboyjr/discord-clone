import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import OpenModalImage  from '../../../OpenModalImage'
import EditChannelModal  from '../../../EditChannelModal'


const ChannelsCard = ({ channel, serverId }) => {
console.log({channel})

    return (
        <div>

        <NavLink className='channel-card' to={`/${serverId}/${channel.id}/`}>
            <div className='channel-line'>
            #<li key={channel.id}>{channel.name}</li>
            </div>
        </NavLink>

        {/* cotts modal button */}
        <div>
            <OpenModalImage
                buttonText="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png"
                modalComponent={<EditChannelModal channel={channel} />}
                />
        </div>


    </div>
    )

}

export default ChannelsCard
