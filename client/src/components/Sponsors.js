import React, { useEffect, useState } from "react";

function Sponsors() {
    const [partners, setPartners] = useState([])

    useEffect(() => {
        fetch('https://iac-api-fv75.onrender.com/sponsors')
            .then((r) => r.json())
            .then((data) => {
                setPartners(data)
            })
    }, [])

    return (
        <div className="trusted-partners">
            <h2 className="partners-header">Trusted Partners</h2>
            <div className="partners-list">
                {partners.map((partner) => (
                    <a key={partner.id} href={partner.link} target="_blank" rel="noopener noreferrer" className="partner-link">
                        <img src={partner.image} alt={`${partner.name} logo`} className="partner-logo" />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Sponsors