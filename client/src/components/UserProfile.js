import { useAuth } from "./AuthContext";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-header">
            <img src={user.picture} alt={user.name} className="avatar-image"/>
            <h5 className="profile-headers">Name:</h5>
            <p className="profile-content">{user.nickname}</p>
            <h5 className="profile-headers">Email:</h5>
            <p className="profile-content">{user.email}</p>
            <h5 className="profile-headers">Purchased Shows</h5>
            <p className="profile-content">Gift of Time</p>
        </div>
      </div>
    )
  );
};

export default Profile;