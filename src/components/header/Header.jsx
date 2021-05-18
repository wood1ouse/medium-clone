import React from "react";
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to='/' className='navbar-brand'>Medium</Link>
                <ul className='nav navbar-nav pull-xs-right'>
                    <li className='nav-item'>
                        <NavLink to={'/'} className='navbar-link' exact>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={'/login'} className='navbar-link'>Sign in</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={'/register'} className='navbar-link'>Sign up</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header