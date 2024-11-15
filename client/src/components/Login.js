import { useAuth } from "./AuthContext";
import React from "react";
import LoginImage from '../assets/Login.png'

const Login = () => {
  const { loginWithRedirect } = useAuth();

  return (
    <div className="login-content">
      <img src={LoginImage} alt='Login logo' className="login-image"/>
      <button className='login-button' onClick={() => loginWithRedirect()}>Log In</button>
    </div>
)};

export default Login;