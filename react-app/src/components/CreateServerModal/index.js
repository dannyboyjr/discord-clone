import React, { useState } from "react";
// import {  } from "../../store/servers";     import thunk from Server store when able
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateServerModal.css";

function CreateServerModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(name, icon)); replace with thunk name where it says 'login'
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
      <h1>Create a Server</h1>
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
        <label>
          Icon URL
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateServerModal;
