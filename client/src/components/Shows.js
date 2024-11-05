import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'

function Shows() {
    const [shows, setShows] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch('shows')
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
                            <img src={show.image} alt={`${show.name}'s image`} className="shows-image"/>
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
            </div>
    )
}

export default Shows