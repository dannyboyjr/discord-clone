import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAServer } from '../../store/servers';

const CreateServerModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newServer = { name, icon };
    
    await dispatch(createAServer(newServer));
    onClose();
  };


  return (
    <div className="create-server-modal">
      <div className="create-server-modal-content">

        <h2>Create a Server</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Server Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>
          <div className="input-container">
            <label htmlFor="icon">Server Icon</label>
            <input
              type="text"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />

          </div>
          <div className="button-container">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;