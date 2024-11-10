import { useAuth } from "./AuthContext";
import React from "react";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <div>
    <button className='logout-button' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    </div>
  );
};

export default Logout;