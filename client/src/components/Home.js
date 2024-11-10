import React from "react";
import ImageLogo from '../assets/ICA-LOGO.PNG'
import Sponsors from "./Sponsors";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
    const { user, isAuthenticated } = useAuth0()

    return (
        <div>
            {isAuthenticated ? (
                <h3 className="welcome-text">Welcome {user.name}</h3>
            ) : (null)}
            <div className="home-container" style={{position: "relative"}}>
                <div className="background-image" style={{backgroundImage: `url(${ImageLogo})`}}></div>
            </div>
            <Sponsors/>
        </div>
    )
}

export default Home