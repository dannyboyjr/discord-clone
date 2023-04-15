import React, { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import loginImage from "./discord-login.jpg"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isDemo, setIsDemo] =useState(false)
  useEffect(() => {if ((isDemo) && (email === 'demo@aa.io') && (password === 'password')) {makeLoginRequest()}}, [isDemo, email, password] )


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setErrors(['Incorrect credentials.  Please check your Username and Password']);
  }
  };

  const makeLoginRequest = () => {return dispatch(sessionActions.login({ email, password }))
  .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
  })
}

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsDemo(true)

  setEmail('demo@aa.io')
  setPassword('password')

  }

  return (

    <div className="login-page-container">
      <img className="login-image" src={loginImage} alt="Login Image"/>
    <div className="login-container">
      <h1 className="login-text-container">Log In Here!</h1>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <h3 className="welcome-login-text">Welcome back!</h3>
        <p className="excited-login-text" >We're so excited to see you again!</p>
        <ul className='login-form-error'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="email-login">
          <span>Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="password-login">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit-login-button" type="submit">Log In</button>
        <button onClick={ demoLogin } className='button-Demo'>Demo-User Login</button>
      </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
