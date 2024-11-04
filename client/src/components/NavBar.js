import { NavLink } from "react-router-dom";
import Image from '../ICA.png'

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
            <NavLink to='/sponsors' className="nav-item">
                Sponsors
            </NavLink>
            <NavLink to='/testimonials' className="nav-item">
                Testimonials
            </NavLink>
            <NavLink to='/sign-in' className="nav-item">
                Sign In
            </NavLink>
            </div>
        </nav>
    )
}

export default NavBar