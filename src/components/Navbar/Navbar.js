import React from 'react';

import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul className={classes.uList}>
                        <li className={classes.listItem}><a href="/">Home</a></li>
                        <li className={classes.listItem}><a href="/favourites">Favourites</a></li>
                        <li className={classes.listItem}><a href="/sites">My Sites</a></li>
                        <li className={classes.listItem}><a href="/profile">Profile</a></li>
                        <li className={classes.listItem}><a href="/login">Login</a></li>
                        <li className={classes.listItem}><a href="/logout">Logout</a></li>
                    </ul>
                </nav>
            </header>
            
        </div>
    );
};

export default Navbar;