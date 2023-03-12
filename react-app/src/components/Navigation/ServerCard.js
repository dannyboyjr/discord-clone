import './ServerCard.css'
import { NavLink } from 'react-router-dom'


const ServerCard = ({ server }) => {

        const iconUrl = server.icon ? server.icon : 'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png';

    return (

            <NavLink className='server-card-pic' to={`/${server.id}/`}>
                    <img src={iconUrl} alt='add default server image here'></img>
            </NavLink>
    )
}

export default ServerCard
