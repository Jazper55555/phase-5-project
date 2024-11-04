import React from "react";
import ImageLogo from '../ICA-LOGO.PNG'

function SignIn() {

    return (
    <div className="sign-in-container" style={{position: "relative"}}>
        <div className="sign-in-image" style={{backgroundImage: `url(${ImageLogo})`}}></div>
    </div>
    )
}

export default SignIn