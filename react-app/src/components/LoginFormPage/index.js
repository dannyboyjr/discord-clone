import React, { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

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
    <>
      <h1>Log In</h1>
      <button onClick={ demoLogin } className='button-Demo '>Demo-User Login</button>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
