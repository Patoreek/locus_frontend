import React from 'react';

import classes from './Navbar.module.css';
import logoSVG from '../../images/logo.svg';

const Navbar = () => {
    return (
        <div className={classes.NavBar}>
            <header>
                <nav>
                    <ul className={classes.uList}>
                        <li className={classes.logoItem}>
                           <img src = {logoSVG} className={classes.logo}/>
                        </li>
                        <li className={classes.listItem}><a href="/">Home</a></li>
                        <li className={classes.listItem}><a href="/favourites">Favourites</a></li>
                        <li className={classes.listItem}><a href="/sites">My Sites</a></li>
                        <li className={classes.listItem}><a href="/profile">Profile</a></li>
                        <li className={classes.listItem}><a href="/admin">Admin</a></li>
                        <li className={classes.listItem}><a href="/login">Login</a></li>
                        <li className={classes.listItem}><a href="/logout">Logout</a></li>
                    </ul>
                </nav>
            </header>
            
        </div>
    );
};

export default Navbar;