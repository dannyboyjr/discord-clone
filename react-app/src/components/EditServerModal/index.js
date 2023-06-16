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
    <div className="edit-server-modal">
      <div className="edit-server-modal-content">

        <h2>Edit Your Server</h2>
        <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="edit-server-modal-input-container">
            <label htmlFor="name">Server Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>
          <div className="edit-server-modal-input-container">
            <label htmlFor="icon">Server Icon</label>
            <input
              type="text"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />

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
};
export default EditServerModal;
