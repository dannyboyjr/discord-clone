import './ServerCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import {  } from '../../store/server'

const ServerCard = ({ server_id }) => {
    // const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)

    return (

            <NavLink className='server-card-pic' to={`/${server_id}/`}>
                    <img  src={server.icon} alt='add default server image here'></img>
            </NavLink>
    )
}

export default ServerCard
