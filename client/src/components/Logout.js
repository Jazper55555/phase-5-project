import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Logout = () => {
  const { user, logout } = useAuth0();

  return (
    <div>
    <button className='logout-button' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    </div>
  );
};

export default Logout;