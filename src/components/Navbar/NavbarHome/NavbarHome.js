import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './NavbarHome.module.scss';
import { ReactComponent as LogoSVG } from '../../../assets/logo/LocusLogo_white.svg';

import AuthDrawer from '../../AuthDrawer/AuthDrawer';


import { AuthContext,
         AccountContext,
        AuthDrawerContext } from '../../../context/AuthContext';


const NavbarHome = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [account, setAccount] = useContext(AccountContext);

    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

    let history = useHistory();

    const authDrawerHandler = (option) => {
        if (option === "login") {
            console.log('login screen will appear.');
            setAuthDrawer({
                open: true,
                login: true,
                signup: false
            });
        } else if (option === "signup") {
            console.log('signup screen will appear.');
            setAuthDrawer({
                open: true,
                login: false,
                signup: true
            });
        }
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
                <nav className={`${classes.NavBar} ${authDrawer.open ? classes.hide : null}`}>
                    <div className={classes.navList}>
                        <div className={classes.logoItem}>
                            <a href="/"><LogoSVG className={classes.logo}/></a>
                        </div>
                        {/* {isAuth ?  <div className={classes.listSpacer}>|</div> : null}
                            <div className={classes.listItem}><a href="/map" className={classes.listLink}>Map</a></div>
                        {isAuth ?  <div className={classes.listSpacer}>|</div> : null}
                        
                        {isAuth ? <div className={classes.listItem}><a href="/favourites" className={classes.listLink}>Favourites</a></div> : null }
                        {isAuth ?  <div className={classes.listSpacer}>|</div> : null}
                        {isAuth ? <div className={classes.listItem}><a href="/mySites" className={classes.listLink}>My Sites</a></div> : null }
                        {isAuth ?  <div className={classes.listSpacer}>|</div> : null}
                        {isAuth ? <div className={classes.listItem}><a href="/profile" className={classes.listLink}>Profile</a></div> : null }
                        {isAuth ?  <div className={classes.listSpacer}>|</div> : null} */}

                        
                        {/* {isAuth ? <div className={classes.listItemRight}><a onClick={logoutHandler}>Logout</a></div> : null }
                        {isAuth ?  <div className={classes.listSpacerRight}>|</div> : null}
                        {isAuth ? <div className={classes.listItemName}>
                            <p className={classes.name}>Welcome, <b>{account.username}!</b></p>
                        </div> : null } */}
                           
                        <div className={classes.rightNav}>
                       
                         
                            <div className={classes.mapLink}><a href="/map">Go to Map</a></div>
                            {isAuth ? <div className={classes.usernameContainer}>
                                <p className={classes.username}>Welcome, <b>{account.username}!</b></p>
                            </div> : null }
                            {isAuth ? <div className={classes.logout}><a onClick={logoutHandler}>Logout</a></div> : null }

                            {!isAuth ? <div className={`${classes.btn} ${classes.btn__login}`} onClick={() => authDrawerHandler('login')}>Log in</div> : null }
                            {!isAuth ? <div className={`${classes.btn} ${classes.btn__signup}`} onClick={() => authDrawerHandler('signup')}>Sign Up</div> : null } 
                            
                        </div>
                        
                            
         
                    
                    </div>
                </nav>
                {/* <nav className={classes.NavBarMobile}>
                <ul className={classes.uList}>
                        <li className={classes.listItem} onClick={sideDrawerHandler}><FaBars className={classes.toggleButton}/></li>
                        <li className={classes.logoItem}>
                            <a href="/"><LogoSVG/></a>
                        </li>
                </ul>
                </nav> */}
            </header>
    

            <AuthDrawer/>
        </div>
    );
};

export default NavbarHome;