import React from 'react';
import './ProfileCard.css';
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import UserIcon from '../../assets/user.png'
import LogoutImg from '../../assets/logout.png'

const ProfileCard = () => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser)
  return (
    <div className="ProfileCard">

      <img className="profile-avatar"src={UserIcon} />
      <div>
        <p>{sessionUser.username}</p>
        <span className='profile-id'>#{sessionUser.id}</span>
      </div>
      <img className="profile-logout" onClick={handleLogout} src={LogoutImg} alt="logout"/>
    </div>
  );
}

export default ProfileCard;
