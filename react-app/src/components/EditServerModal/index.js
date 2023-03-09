import React, { useState } from "react";
// import {  } from "../../store/servers";     import thunk from Server store when able
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditServerModal.css";

function EditServerModal() {
  const dispatch = useDispatch();
  // const selectedServer = useSelector(state => state.spotState[parseInt(spotId)])  pull the server id from the server state
  const [name, setName] = useState("");       // UseState should contain "selectedServer.name"
  const [icon, setIcon] = useState("");       // UseState should contain "selectedServer.icon"
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
      <h1>Edit a Server</h1>
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
        <button type="submit">Edit</button>
      </form>
    </>
  );
}

export default EditServerModal;