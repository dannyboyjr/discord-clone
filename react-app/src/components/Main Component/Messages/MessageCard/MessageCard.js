import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'



const MessageCard = ({ message }) => {

    return (

        <li key={message.id}>{message.content}</li>
    )
}

export default MessageCard