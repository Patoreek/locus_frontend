import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './NavbarMain.module.scss';

import { ReactComponent as LogoSVG } from '../../../assets/logo/LocusLogo_black.svg';
import { ReactComponent as ArrowSVG } from '../../../assets/icons/arrow-left.svg';


import AuthDrawer from '../../AuthDrawer/AuthDrawer';
import SearchBarMap from '../../SearchBarMap/SearchBarMap';


import { AuthContext,
         AccountContext,
        AuthDrawerContext,
        PanToContext } from '../../../context/AuthContext';

import avatarPlaceholder from '../../../assets/images/avatar_placeholder.jpeg';




const NavbarMain = () => {
    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [account, setAccount] = useContext(AccountContext);

    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

    const panTo = useContext(PanToContext);

    const [dropdown, setDropdown] = useState(false); //! Change to False


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
                <nav className={`${classes.navbar} ${authDrawer.open ? classes.hide : null}`}>
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

                        <div className={classes.searchbarContainer}>
                            <SearchBarMap panTo={panTo}/>
                        </div>
                           
                        <div className={classes.rightNav}>

                            {/* IF LOGGED IN SHOW THIS */}
                
                            {isAuth && ( 
                            <div className={classes.dropdownContainer}>
                                <div className={classes.usernameContainer} onClick={() => setDropdown(!dropdown)}><span className={classes.username}>{account.username}</span></div>
                                <div className={`${classes.dropdown}`}>
                                    <div className={`${classes.dropdown__content} ${!dropdown ? classes.fade : null}`}>
                                        <div className={classes.dropdown__email}>
                                            <span className={classes.title}>Your account</span>
                                            <span className={classes.email}>{account.email}</span>
                                        </div>
                                        <div className={classes.dropdown__diveReports}>
                                            <a href="#">Dive Reports</a>
                                        </div>
                                        <div className={classes.dropdown__mySites}>
                                            <a href="/mySites">My Sites</a>
                                        </div>
                                        <div className={classes.dropdown__favourites}>
                                            <a href="/favourites">Favourites</a>
                                        </div>
                                        <div className={classes.dropdown__profile}>
                                            <a href="/profile">Profile</a>
                                        </div>
                                        <div className={classes.dropdown__logout}>
                                            <a onClick={logoutHandler}>Logout</a>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div> 
                            )}
                             {isAuth && ( 
                                <div className={classes.arrowContainer}>
                                 <ArrowSVG className={`${classes.arrow} ${dropdown ? classes.rotate : null}`}/>
                                </div>
                             )}
                            {isAuth && (
                                 <div className={classes.avatar} onClick={() => setDropdown(!dropdown)}>
                                     <img className={classes.avatar__image} src={avatarPlaceholder} alt="placeholder of users face."/>
                                 </div>
                            )}


                            {/* IF NOT LOGGED IN SHOW THIS */}

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

export default NavbarMain;