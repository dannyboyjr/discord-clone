import './ChannelsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import OpenModalImage  from '../../../OpenModalImage'
import EditChannelModal  from '../../../EditChannelModal'


const ChannelsCard = ({ channel, serverId }) => {
console.log({channel})

    return (
        <div className='channel-card'>

        <NavLink className='channel-card-name' to={`/${serverId}/${channel.id}/`}>
            <div className='channel-line'>
            #<li key={channel.id}>{channel.name}</li>
            </div>
        </NavLink>

        {/* cotts modal button */}
        <div className='channel-card-edit'>
            <OpenModalImage
                buttonText="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Font_Awesome_5_regular_edit.svg/1200px-Font_Awesome_5_regular_edit.svg.png"
                modalComponent={<EditChannelModal channel={channel} />}
                />
        </div>


    </div>
    )

}

export default ChannelsCard
