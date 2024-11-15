import { NavLink, useLocation } from "react-router-dom";
import ICAImage from '../assets/ICA.png'
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "./AuthContext";

function NavBar() {
    const location = useLocation()
    const { user, isAuthenticated } = useAuth()

    return(
        <nav className="navbar">
            <div className="logo">
            <NavLink to='/'>
                <div className="logo-content">
                    <img src={ICAImage} alt='ICA logo' className="logo-image"/>
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
                location.pathname === '/profile' ? (
                    <Logout className='logout-button'/>
                ) : (
                    <NavLink to='/profile'>
                        <img src={user.picture} alt={user.name} className="user-avatar"/>
                    </NavLink>
                )
            ) : (
                <Login className='login-button'/>
            )}
        </nav>
    )
}

export default NavBar