import { NavLink } from "react-router-dom";
import Image from '../assets/ICA.png'
import LoginTest from "./Login";

function NavBar() {

    return(
        <nav className="navbar">
            <div className="logo">
            <NavLink to='/'>
                <div className="logo-content">
                    <img src={Image} alt='ICA logo' className="logo-image"/>
                    <span><i>Instinct Creative Arts</i></span>
                </div>
            </NavLink>
            </div>
            <div className="nav-container">
                <div className="nav-links">
                    <NavLink to='/about' className="nav-item">
                        About
                    </NavLink>
                    <NavLink to='/shows' className="nav-item">
                        Shows
                    </NavLink>
                    <NavLink to='/clients' className="nav-item">
                        Clients
                    </NavLink>
                    <NavLink to='/testimonials' className="nav-item">
                        Testimonials
                    </NavLink>
                </div>
            </div>
            <LoginTest className="login-button" />
        </nav>
    )
}

export default NavBar