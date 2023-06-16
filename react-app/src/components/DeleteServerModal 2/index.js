// import React, { useState } from 'react';
// // import { deleteAServer } from '../../store/servers';
// import { useDispatch } from 'react-redux';
// import { useModal } from "../../context/Modal";
// import './DeleteServerModal.css'

// //IN PROGRESS
// const DeleteServerModal = () => {
//   const [toDeleteName, setToDeleteName] = useState('');
//   const dispatch = useDispatch();
//   const currentServer = useSelector((state) => state.servers.serverById);
//   const { closeModal } = useModal();



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (toDeleteName = currentServer.name){
//       await dispatch(deleteAServer(newServer));
//       closeModal();
//     }
//     const newServer = { name, icon };



//   };


//   return (
//     <div className="create-server-modal">
//       <div className="create-server-modal-content">

//         <h2>Are you sure?</h2>
//         <h5>To delete your server, type in its name</h5>
//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <label htmlFor="toDeleteName">Server Name</label>
//             <input
//               type="text"
//               name="toDeleteName"
//               value={toDeleteName}
//               onChange={(e) => setToDeleteName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="button-container">
//             <button type="submit">Delete</button>
//             <button type="button" onClick={closeModal}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DeleteServerModal;
