import './MessageCard.css'


const MessageCard = ({ message }) => {
    const date = new Date(message.created_at);

    const options = {
        hour: 'numeric',
        minute: 'numeric'
      };
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long' });
    const timeString = date.toLocaleTimeString('en-US', options);
    const displayString = `${dateString} at ${timeString}`;

    return (
        <div className='message-display-container'>
            <span className='message-username'>{message.user.username} </span>
            <span className='message-time-stamp'>{displayString}</span>
            <div className='message-content'>
        <li key={message.id}>{message.content}</li>
        </div>
        </div>
    )
}

export default MessageCard