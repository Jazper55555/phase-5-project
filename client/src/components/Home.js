import React from "react";
import ImageLogo from '../assets/ICA-LOGO.PNG'
import Sponsors from "./Sponsors";

function Home() {

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