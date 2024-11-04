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
        history.push(`/shows`)
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
                        <li key={show.id} className="show-item">
                            <img src={show.image} alt={`${show.name}'s image`} className="shows-image" onClick={() => handleClick(show)}/>
                            <br/>
                            <div className="show-info">
                                <div className="overlay">
                                    <div className="overlay-text">{show.name}</div>
                                </div>
                            </div>
                            {/* {show.audio && (
                            <audio controls>
                                <source src={`/static/${show.audio}`} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            )} */}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
    )
}

export default Shows