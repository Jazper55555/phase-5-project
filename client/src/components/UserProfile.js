import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const saveUser = async () => {
        try {
          const response = await fetch('http://localhost:5555/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.nickname, email: user.email }),
          });
          if (!response.ok) {
            throw new Error('Failed to save user');
          }
        } catch (error) {
          console.error('Error saving user:', error);
        }
      };

      saveUser();
    }
  }, [isAuthenticated, user]);

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
