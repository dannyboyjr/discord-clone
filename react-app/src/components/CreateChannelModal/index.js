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
      <h1>Create a Channel</h1>
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
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateChannelModal;
