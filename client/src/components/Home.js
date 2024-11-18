import React from "react";
import ImageLogo from '../assets/ICA-LOGO.PNG'
import Sponsors from "./Sponsors";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

function Home() {
    const { user, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
          const saveUser = async () => {
            try {
              const response = await fetch('https://iac-api-fv75.onrender.com/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ auth0_id: user.sub, username: user.nickname, email: user.email }),
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
        <div>
            <div className="home-container" style={{position: "relative"}}>
                <div className="background-image" style={{backgroundImage: `url(${ImageLogo})`}}></div>
            </div>
            <Sponsors/>
        </div>
    )
}

export default Home