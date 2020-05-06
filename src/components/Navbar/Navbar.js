import React, { useContext, useEffect } from 'react';
import { useHistory} from 'react-router-dom';

import classes from './Navbar.module.css';
import logoSVG from '../../images/logo.svg';

import { AuthContext,
         AccountContext } from '../../context/AuthContext';


const Navbar = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [account, setAccount] = useContext(AccountContext);

    let history = useHistory();

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
        <div className={classes.NavBar}>
            <header>
                <nav>
                    <ul className={classes.uList}>
                        <li className={classes.logoItem}>
                           <img src = {logoSVG} className={classes.logo}/>
                        </li>
                        <li className={classes.listItem}><a href="/">Home</a></li>
                        <li className={classes.listItem}><a href="/map">Map</a></li>

                        
                        {isAuth ? <li className={classes.listItem}><a href="/favourites">Favourites</a></li> : null }
                        {isAuth ? <li className={classes.listItem}><a href="/mySites">My Sites</a></li> : null }
                        {isAuth ? <li className={classes.listItem}><a href="/profile">Profile</a></li> : null }
    {isAuth ? <li className={classes.listItem}><b>Welcome, {account.username}!</b></li> : null }
                        {isAuth ? <li className={classes.listItem}><a onClick={logoutHandler}>Logout</a></li> : null }
                           

                        {!isAuth ? <li className={classes.listItem}><a href="/login">Login</a></li> : null }
                        {!isAuth ? <li className={classes.listItem}><a href="/signup">Sign Up</a></li> : null }
                            
         
                    
                    </ul>
                </nav>
            </header>
            
        </div>
    );
};

export default Navbar;