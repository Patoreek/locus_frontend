import React, {useContext} from 'react';

import { useHistory } from 'react-router-dom';

import logoSVG from '../../images/locusLogo.svg';

import { AuthContext, AccountContext } from '../../context/AuthContext';

import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {

    let displayStyle;

    let drawerStyle;

    let history = useHistory();

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [account, setAccount] = useContext(AccountContext);

   
    let attachedClassesSideDrawer = [classes.SideDrawer, classes.Close];
    let attachedClassesBackdrop = [classes.Backdrop, classes.Close];
    if (props.toggleDrawer){
        attachedClassesSideDrawer = [classes.SideDrawer, classes.Open];
        attachedClassesBackdrop = [classes.Backdrop, classes.Open];
    }

    const backdropHandler = () => {
        console.log('Backdrop pressed');
        props.setToggleDrawer(false);
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


    return (
        <div>
            <div className={attachedClassesBackdrop.join(' ')} onClick={backdropHandler}>
            </div>
                <div className={attachedClassesSideDrawer.join(' ')}>
                <ul className={classes.uList}>
                        <li className={classes.logoItem}>
                            <a href="/"><img src = {logoSVG} className={classes.logo}/></a>
                        </li>
                        {/* <li className={classes.listItem}><a href="/">Home</a></li> */}
                        {isAuth ? <li className={classes.logoItem}>
                            <p className={classes.name}>Welcome, <b>{account.username}!</b></p>
                        </li> : null }
                        <li className={classes.logoItem}><a href="/map" className={classes.listLink}>Map</a></li>
                        
            {isAuth ? <li className={classes.logoItem}><a href="/favourites" className={classes.listLink}>Favourites</a></li> : null }
            {isAuth ? <li className={classes.logoItem}><a href="/mySites"  className={classes.listLink}>My Sites</a></li> : null }
            {isAuth ? <li className={classes.logoItem}><a href="/profile" className={classes.listLink}>Profile</a></li> : null }
                        
                        {isAuth ? <li className={classes.logoItem}><span onClick={logoutHandler} className={classes.listLink}>Logout</span></li> : null }
                           

                        {!isAuth ? <li className={classes.logoItem}><a href="/login" className={classes.listLink}>Login</a></li> : null }
                        {!isAuth ? <li className={classes.logoItem}><a href="/signup" className={classes.listLink}>Sign Up</a></li> : null } 
                            
         
                    
                    </ul>
                </div>
        </div>
    );
};

export default SideDrawer;