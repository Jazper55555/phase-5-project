import React from "react";
import ImageLogo from '../ICA-LOGO.PNG'

function Home() {

    return (
    <div className="home-container" style={{position: "relative"}}>
        <div className="background-image" style={{backgroundImage: `url(${ImageLogo})`}}></div>
    </div>
    )
}

export default Home