import React, { useState } from "react";
import { editServerById } from "../../store/servers";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditServerModal.css";

function EditServerModal({server}) {
  const dispatch = useDispatch();
  // const selectedServer = useSelector(state => state.spotState[parseInt(spotId)])  pull the server id from the server state
  const [name, setName] = useState(server.name);
  const [icon, setIcon] = useState(server.icon);
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(editServerById(server, {name, icon}));
    if (data) {
      const {error} = await data.json()
      setErrors(error);
    } else {
        closeModal()
    }
  };

  return (
    <>
      <h1>Edit a Server</h1>
      <form onSubmit={handleSubmit}>
        <ul>
            <li>{errors}</li>
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
