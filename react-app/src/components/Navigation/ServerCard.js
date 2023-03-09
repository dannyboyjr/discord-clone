import './ServerCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'


const ServerCard = ({ server }) => {

    return (

            <NavLink className='server-card-pic' to={`/${server.id}/`}>
                    <img  src={server.icon} alt='add default server image here'></img>
            </NavLink>
    )
}

export default ServerCard
