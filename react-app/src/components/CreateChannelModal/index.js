import React, { useState } from "react";
import { createChannelInServer } from "../../store/channels";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateChannelModal.css";

function CreateChannelModal({serverId}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createChannelInServer(serverId, {name}));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="create-channel-modal">
      <div className="create-channel-modal-content">

        <h2>Create a Channel</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="create-channel-modal-input-container">
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
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
}

export default CreateChannelModal;
