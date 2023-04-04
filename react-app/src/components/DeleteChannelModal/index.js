import React, { useState } from 'react';
import { deleteChannelById } from '../../store/channels';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";

//IN PROGRESS
const DeleteChannelModal = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { closeModal } = useModal();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newServer = { name, icon };

    await dispatch(deleteChannelById(newServer));
    closeModal();
  };


  return (
    <div className="create-server-modal">
      <div className="create-server-modal-content">

        <h2>Are you sure?</h2>
        <h5>To delete your channel, type in its name</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Channel Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit">Delete</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
