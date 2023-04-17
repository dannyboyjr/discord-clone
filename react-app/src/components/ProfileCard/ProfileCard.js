import React from 'react';
import './ProfileCard.css';
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import UserIcon from '../../assets/user.png'
import LogoutImg from '../../assets/logout.png'
import {resetServer} from '../../store/servers'

const ProfileCard = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(()=>{
      dispatch(resetServer())
    })
  };


  console.log(sessionUser)
  return (
    <div className="ProfileCard">

      <img className="profile-avatar"src={UserIcon} alt='avatar'/>
      <div>
        <p>{sessionUser.username}</p>
        <span className='profile-id'>#{sessionUser.id}</span>
      </div>
      <img className="profile-logout" onClick={handleLogout} src={LogoutImg} alt="logout"/>
    </div>
  );
}

export default ProfileCard;
