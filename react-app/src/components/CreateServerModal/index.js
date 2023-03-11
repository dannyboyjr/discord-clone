import React, { useState, useEffect } from 'react';
import { createAServer } from '../../store/servers';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";

const CreateServerModal = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newServer = { name, icon };

    const data = await dispatch(createAServer(newServer))
    closeModal()
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