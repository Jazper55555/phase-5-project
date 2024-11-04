import React, { useState } from "react";

function About() {
    const [bio, setBio] = useState(null)

    const handleButtonClick = (name) => {
        setBio(name)
    }

    return (
        <div className="about-container">
            <div className="about-header">About Us</div>
            <div className="button-container">
                <button onClick={() => handleButtonClick('marc')}>Marc Young</button>
                <button onClick={() => handleButtonClick('jazper')}>Jazper Saldaña</button>
            </div>
            <br/><br/>
            <div className="about-content">
                {bio === 'marc' && (
                    <div className="bio-section">
                        <img
                            src="https://static.wixstatic.com/media/8a84be_5f05f9704bbf416d9985a2c16053fb9a~mv2.jpg/v1/crop/x_1546,y_130,w_1508,h_1810/fill/w_348,h_418,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Marc%20but%20standing.jpg"
                            className="about-image"
                            alt="Marc Young"
                        />
                        <span className="marc-bio">
                        Marc Young was born and raised in Southern California. 
                        He is an educator and designer in the marching arts activity teaching a number of groups in the Orange County area and is currently the Percussion Director at Westminster HS and Loara HS. 
                        Marc was the Percussion Caption Head and Program Coordinator for Impulse Drum and Bugle Corps (2018 - 2020) and other independent groups he’s taught include Odyssey Indoor Percussion (2017) and Blue Stars Drum and Bugle Corps (2022). 
                        Marc is the founder of Instinct Percussion (2019 - Present) where he is also the Creative Director and Battery Arranger. 
                        Groups he has marched include Impulse Drum and Bugle Corps (2010 - 2012, 2014) and POW Percussion (2012).
                        <br/><br/>
                        Marc is an active performer for Aerial Experience Productions, a professional performance group that highlights various types of artistry such as aerial acrobatics, dance, and rudimental percussion. 
                        In addition to his experience in music, he is also involved in theater where he performs, collaborates, and devizes work in the Los Angeles area and is a founding member of Contigo Theatre Company. 
                        Marc attended California State University, Long Beach where he studied Music Performance, and Theater.
                        <br/><br/>
                        Marc is a proud endorser of Vic Firth and Zildjian.
                        </span>
                    </div>
                )}
                {bio === 'jazper' && (
                    <div className="bio-section">
                        <img
                            src="https://static.wixstatic.com/media/8a84be_0449b629725546e2a94cc7ec343b5235~mv2.jpg/v1/crop/x_31,y_20,w_406,h_486/fill/w_438,h_512,al_c,lg_1,q_80,enc_auto/jazperheadshot_edited.jpg"
                            className="about-image"
                            alt="Jazper Saldaña"
                        />
                        <span className="jazper-bio">
                        Jazper Saldaña is currently the Director of Percussion at Haltom High School in Fort Worth, TX. 
                        Prior to that, he worked with numerous groups in the Southern California and Texas areas including Westminster HS, Ayala HS, and Centennial HS. 
                        Jazper has also served as the Front Ensemble Caption Head for the Mandarins, Blue Stars, and Vigilantes Indoor Percussion. 
                        Additionally, he is on staff with the Concord Blue Devils.
                        <br/><br/>
                        Originally from San Diego, California, he completed a Bachelor’s Degree in Percussion Performance from California State University, Long Beach. 
                        He went on to receive a Master’s Degree in Percussion from the University of North Texas. 
                        Indoor marching experience includes Alternative Percussion, Pulse Percussion, and Riverside Community College. 
                        DCI performance experience includes the Sacramento Mandarins and the Concord Blue Devils. 
                        <br/><br/>
                        He currently resides in Fort Worth, TX with his wife, son, & dog.
                        <br/><br/>
                        Jazper is a proud endorser of Vic Firth and Zildjian.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default About