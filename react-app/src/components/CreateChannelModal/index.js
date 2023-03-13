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
    <>
    <div className="create-channel-container">
      <div className="create-channel-main">
      <h1>Create a Channel</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <div className="channel-button-container">
        <button type="submit">Create</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default CreateChannelModal;
