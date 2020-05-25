import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';

import classes from './Navbar.module.css';
import logoSVG from '../../images/locusLogo.svg';

import SideDrawer from '../SideDrawer/SideDrawer';


import { AuthContext,
         AccountContext } from '../../context/AuthContext';


const Navbar = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [account, setAccount] = useContext(AccountContext);

    const [toggleDrawer, setToggleDrawer] = useState(false);

    let history = useHistory();

    const sideDrawerHandler = () => {
        console.log('Side Drawer Button Pressed!');
        setToggleDrawer(!toggleDrawer);
    }

    const logoutHandler = () => {
        // setIsAuth(false);  
        // setAccount({
        //     id: null,
        //     username: null
        // });
        return fetch('http://localhost:8080/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                logout: true
            })
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            setIsAuth(false);
            history.push('/'); //REDIRECT TO HOME
        })
        .catch(err => {
            console.log(err);
        });

    }

    // console.log('[NavBar accountID]' + account.id);
    // console.log('[NavBar accountName]' + account.username);



    return (
        <div>
            <header>
                <nav className={classes.NavBar}>
                    <ul className={classes.uList}>
                        <li className={classes.logoItem}>
                            <a href="/"><img src = {logoSVG} className={classes.logo}/></a>
                        </li>
                        {/* <li className={classes.listItem}><a href="/">Home</a></li> */}
                        {isAuth ?  <li className={classes.listSpacer}>|</li> : null}
                            <li className={classes.listItem}><a href="/map" className={classes.listLink}>Map</a></li>
                        {isAuth ?  <li className={classes.listSpacer}>|</li> : null}
                        
                        {isAuth ? <li className={classes.listItem}><a href="/favourites" className={classes.listLink}>Favourites</a></li> : null }
                        {isAuth ?  <li className={classes.listSpacer}>|</li> : null}
                        {isAuth ? <li className={classes.listItem}><a href="/mySites" className={classes.listLink}>My Sites</a></li> : null }
                        {isAuth ?  <li className={classes.listSpacer}>|</li> : null}
                        {isAuth ? <li className={classes.listItem}><a href="/profile" className={classes.listLink}>Profile</a></li> : null }
                        {isAuth ?  <li className={classes.listSpacer}>|</li> : null}

                        
                        {isAuth ? <li className={classes.listItemRight}><a onClick={logoutHandler}>Logout</a></li> : null }
                        {isAuth ?  <li className={classes.listSpacerRight}>|</li> : null}
                        {isAuth ? <li className={classes.listItemName}>
                            <p className={classes.name}>Welcome, <b>{account.username}!</b></p>
                        </li> : null }
                           

                        {!isAuth ? <li className={classes.listItemRight}><a href="/signup">Sign Up</a></li> : null } 
                        {!isAuth ?  <li className={classes.listSpacerRight}>|</li> : null}
                        {!isAuth ? <li className={classes.listItemRight}><a href="/login">Login</a></li> : null }
                            
         
                    
                    </ul>
                </nav>
                <nav className={classes.NavBarMobile}>
                <ul className={classes.uList}>
                        <li className={classes.listItem} onClick={sideDrawerHandler}><FaBars className={classes.toggleButton}/></li>
                        <li className={classes.logoItem}>
                            <a href="/"><img src = {logoSVG} className={classes.logo}/></a>
                        </li>
                </ul>
                </nav>
            </header>
            
            <SideDrawer 
                toggleDrawer={toggleDrawer}
                setToggleDrawer={setToggleDrawer}
            />
        </div>
    );
};

export default Navbar;