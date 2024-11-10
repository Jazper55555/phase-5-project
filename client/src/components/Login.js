import { useAuth } from "./AuthContext";
import React from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth();

  return <button className='login-button' onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Login;