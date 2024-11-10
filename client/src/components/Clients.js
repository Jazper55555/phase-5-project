import React from "react";
import Sponsors from "./Sponsors";

function Clients() {

    return(
        <div>
            <div className="clients-container">
                <div className="clients-header">
                Clients
                </div>
                <div className="clients-content">
                Schools/Organizations
                </div>
            </div>
            <Sponsors />
        </div>    
    )
}

export default Clients