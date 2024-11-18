import React from "react";
import Sponsors from "./Sponsors";
import { useEffect, useState } from "react";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        fetch('https://iac-api-fv75.onrender.com/testimonials')
        .then((r) => r.json())
        .then((data) => {
            setTestimonials(data)
        })
    }, [])

    return (
        <div>
            <div className="testimonials-container">
                <div className="testimonials-header">
                    Testimonials
                </div>
                <div className="testimonials-content">
                    <ul className="testimonials-list">
                        {testimonials.map((testimonial) => (
                        <li key={testimonial.id} className="testimonial-item">
                            <div className="testimonial-image-wrapper">
                                <p className="testimonial-show-name">{testimonial.show.name}</p>
                                <img src={testimonial.show.image} alt={`${testimonial.show.name}`} className="testimonial-" />
                            </div>
                            <div className="testimonial-content">
                                "{testimonial.content}"
                                <br/><br/>
                                <span className="testimonial-name"> - {testimonial.user.username}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Sponsors />
        </div>        
    )
}

export default Testimonials