// import { useAuth } from "./AuthContext";
// import React from "react";

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     isAuthenticated && (
//       <div className="profile-container">
//         <div className="profile-header">
//             <img src={user.picture} alt={user.name} className="avatar-image"/>
//             <h5 className="profile-headers">Name:</h5>
//             <p className="profile-content">{user.nickname}</p>
//             <h5 className="profile-headers">Email:</h5>
//             <p className="profile-content">{user.email}</p>
//             <h5 className="profile-headers">Purchased Shows</h5>
//             <p className="profile-content">Gift of Time</p>
//         </div>
//       </div>
//     )
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);

 useEffect(() => {
   const fetchData = async () => {
     if (isAuthenticated) {
       try {
         const token = await getAccessTokenSilently({
           audience: 'http://localhost:5555/',
           scope: 'read:users',
         });

         console.log('Access Token:', token); // Debugging line

         const response = await axios.get('http://localhost:5555/users', {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });

         setUsers(response.data);
       } catch (error) {
         console.error('Error fetching users:', error);
       }
     }
   };

   fetchData();
   console.log(users)
 }, [isAuthenticated, getAccessTokenSilently]);


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