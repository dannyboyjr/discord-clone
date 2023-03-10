import React, { useState } from "react";
import {editChannelById} from '../../store/channels'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";


function EditChannelModal({channel}) {
  const dispatch = useDispatch();
    // const selectedChannel = useSelector(state => state.spotState[parseInt(spotId)])  pull the channel id from the channel state
  const [name, setName] = useState(channel.name);       // UseState should contain "selectedChannel.name"
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(editChannelById(channel.server_id, {channelId:channel.id, name}));  
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
