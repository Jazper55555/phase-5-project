import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sponsors from "./Sponsors";

function ShowDetails() {
    const {id} = useParams()
    const [show, setShow] = useState(null)

    useEffect(() => {
        fetch(`https://iac-api-fv75.onrender.com/shows/${id}`)
        .then((r) => r.json())
        .then((data) => {
            setShow(data)
        })
    }, [id])

    if (!show) return <h3>Loading...</h3>

    return (
        <div>
            <div className="selected-show">
                <div className="show-header">
                    <h2 className="show-name">{show.name}</h2>
                    <p className="show-price">${show.price}</p>
                </div>
                <div className="show-section">
                    <img src={show.image} alt={`${show.name}`} className="show-" />
                    <div className="show-details">
                        <h4 className="description-header">Description</h4>
                        <p className="show-description">{show.description}</p>
                        <br/>
                        <h4 className="audio-header">Audio</h4>
                        {show.audio && (
                            <audio controls className="show-audio">
                                <source src={`/static/${show.audio}`} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        <br/>
                        <h4 className="instrumentation-header">Instrumentation</h4>
                        <p className="show-instrumentation">{show.instrumentation}</p>
                    </div>
                </div>
            </div>
            <Sponsors/>
        </div>
    );
}

export default ShowDetails