import { useAuth } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get access token
        const accessToken = await getAccessTokenSilently();

        // Fetch data from API
        const response = await fetch('http://localhost:5555/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

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