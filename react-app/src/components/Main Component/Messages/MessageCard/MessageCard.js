import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './MessageCard.css'


const MessageCard = ({ message }) => {

    return (
        <div className='message-content'>
        <li key={message.id}>{message.content}</li>
        </div>
    )
}

export default MessageCard