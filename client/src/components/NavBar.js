import { NavLink } from "react-router-dom";
import Image from '../assets/ICA.png'
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
    const { isAuthenticated } = useAuth0()

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
            {isAuthenticated ? (
                <Logout className="login-button" />
            ) : (
                <Login className='logout-button'/>
            )}
        </nav>
    )
}

export default NavBar