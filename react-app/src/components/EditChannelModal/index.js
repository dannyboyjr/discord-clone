import React, { useState } from "react";
import {editChannelById} from '../../store/channels'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import "./EditChannelModal.css"


function EditChannelModal({channel}) {
  const dispatch = useDispatch();
    // const selectedChannel = useSelector(state => state.spotState[parseInt(spotId)])  pull the channel id from the channel state Added for git

  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(editChannelById(channel.server_id, channel.id, {name}));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
    <div className="edit-channel-container">
      <h1>Edit your Channel</h1>
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
        <div className="edit-button-container">
        <button type="submit">Edit</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default EditChannelModal;
