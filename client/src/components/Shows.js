import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import Sponsors from "./Sponsors";

function Shows() {
    const [shows, setShows] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch('https://iac-api-fv75.onrender.com/shows')
            .then((r) => r.json())
            .then(setShows)
    }, [])

    function handleClick(show) {
        history.push(`/shows/${show.id}`)
    }

    return (
            <div className="shows-container">
                <br/>
                <div className="shows-header">
                <h1>Shows</h1>
                </div>
                <div className="shows-content">
                <ul className="shows-list">
                    {shows.map((show) => (
                        <li key={show.id} className="shows-item">
                            <img src={show.image} alt={`${show.name}`} className="shows-"/>
                            <br/>
                            <div className="shows-info">
                                <div className="overlay" onClick={() => handleClick(show)}>
                                    <div className="overlay-text">{show.name}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
                <Sponsors/>
            </div>
    )
}

export default Shows