import React, { useEffect, useState } from "react";
import Sponsors from "./Sponsors";

function Clients() {
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch('https://iac-api-fv75.onrender.com/clients')
        .then((r) => r.json())
        .then(setClients)
    }, [])

    return(
        <div>
            <div className="clients-container">
                <div className="clients-header">
                Clients
                </div>
                <div className="clients-content">
                    <ul className="clients-list">
                    {clients.map((client) => (
                        <li key={client.id}>
                            <div className="client-name">{client.name}</div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <Sponsors />
        </div>    
    )
}

export default Clients