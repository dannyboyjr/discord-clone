import React, { useState } from 'react';
import { createAServer } from '../../store/servers';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import './CreateServerModal.css'


const CreateServerModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newServer = { name, icon };

    await dispatch(createAServer(newServer));
    closeModal();
  };


  return (
    <div className="create-server-modal">
      <div className="create-server-modal-content">

        <h2>Create a Server</h2>
        <form onSubmit={handleSubmit}>
          <div className="create-server-modal-input-container">
            <label htmlFor="name">Server Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>
          <div className="create-server-modal-input-container">
            <label htmlFor="icon">Server Icon</label>
            <input
              type="text"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />

          </div>
          <div className="create-server-modal-button-container">
            <button type="submit">Create</button>
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;
