import { NavLink } from "react-router-dom";

function NavBar() {

    return(
        <nav className="navbar">
            <div className="logo">
            <NavLink to='/'>
                <div className="logo-content">
                    <img src='https://www.shutterstock.com/image-vector/drum-sticks-crossed-vector-black-600nw-1634223691.jpg' alt='drumsticks logo' className="logo-image"/>
                    <span>"Unknown"</span>
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
            </div>
        </nav>
    )
}

export default NavBar