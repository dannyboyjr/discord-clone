import React, { useState } from "react";
// import {  } from "../../store/channels";    import thunk from Channel store when able
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditChannelModal.css";

function EditChannelModal() {
  const dispatch = useDispatch();
    // const selectedChannel = useSelector(state => state.spotState[parseInt(spotId)])  pull the channel id from the channel state
  const [name, setName] = useState("");       // UseState should contain "selectedChannel.name"
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(name));   replace with thunk name where it says 'login'
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
        <button type="submit">Edit</button>
      </form>
    </>
  );
}

export default EditChannelModal;
