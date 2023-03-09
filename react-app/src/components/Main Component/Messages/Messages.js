import React from 'react';
import './Messages.css';

function Messages() {
  return (
    <div className="messages-container">

      <div className="message">
        <div className="avatar">
          <img src="https://via.placeholder.com/50" alt="Avatar" />
        </div>
        <div className="content">
          <div className="header">
            <span className="username">User123</span>
            <span className="timestamp">1 hour ago</span>
          </div>
          <div className="body">
            This is hard written code that needs to be replaced with actual messages
          </div>
        </div>
      </div>

      <div className="message">
        <div className="avatar">
          <img src="https://via.placeholder.com/50" alt="Avatar" />
        </div>
        <div className="content">
          <div className="header">
            <span className="username">Cool Guy</span>
            <span className="timestamp">30 minutes ago</span>
          </div>
          <div className="body">
            please delete us
          </div>
        </div>
      </div>

    </div>
  );
}

export default Messages;