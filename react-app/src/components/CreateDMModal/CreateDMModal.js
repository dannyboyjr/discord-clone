import React, { useState } from 'react';
import { createDMServer } from '../../store/dms';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";


const CreateDMModal = () => {
  const [username, setUsername] = useState(" ");
  const dispatch = useDispatch();
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "name": username,
      "icon": "PrivateServer"

    }

    await dispatch(createDMServer(username, payload));
    closeModal();
  };


  return (
    <div className="create-server-modal">
      <div className="create-server-modal-content">

        <h2>Create Dm</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">username </label>
            <input
              type='text'
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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

export default CreateDMModal;