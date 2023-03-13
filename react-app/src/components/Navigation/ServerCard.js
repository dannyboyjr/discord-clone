import './ServerCard.css'
import { NavLink } from 'react-router-dom'
import ServerIcon  from '../../assets/server.png'

const ServerCard = ({ server }) => {

        const iconUrl = server.icon ? server.icon : ServerIcon
        const handleImgError = (e) => {
                e.target.src = ServerIcon
            }

    return (

            <NavLink className='server-card-pic' to={`/${server.id}/`}>
                    <img 
                        src={iconUrl} 
                        onError={handleImgError}
                        alt='add default server image here'></img>
            </NavLink>
    )
}

export default ServerCard
