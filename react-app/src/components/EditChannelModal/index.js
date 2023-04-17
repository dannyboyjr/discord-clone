import React, { useState } from "react";
import {editChannelById} from '../../store/channels'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './EditChannelModal.css'

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
    <div className="edit-channel-modal">
      <div className="edit-channel-modal-content">

        <h2>Edit Your Channel</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="edit-channel-modal-input-container">
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
          <div className="edit-server-modal-button-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={closeModal}>
                Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChannelModal;
