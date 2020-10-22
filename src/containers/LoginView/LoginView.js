import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import classes from './LoginView.module.scss';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { AuthContext, AccountContext, AuthDrawerHandlerContext, AuthDrawerContext, SignUpSuccessContext } from '../../context/AuthContext';

import { ReactComponent as LogoSVG} from '../../assets/logo/LocusLogo_black.svg';


const LoginView = () => {
    

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [account, setAccount] = useContext(AccountContext);
    const authDrawerHandler = useContext(AuthDrawerHandlerContext);
    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
    const [signUpSuccess, setSignUpSuccess] = useContext(SignUpSuccessContext);





    const [errMsg, setErrMsg] = useState("");


    let history = useHistory();
    
    const handleCheckbox = () => {
        setIsChecked(!isChecked);
        // console.log(isChecked);
    }

    const loginHandler = (event) => {
        event.preventDefault();

        const email = inputEmail;
        const password = inputPassword;

        return fetch('http://localhost:8080/login',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            console.log('resData!!!!!!');
            console.log(resData);
            setIsAuth(true);
                setAccount({
                    id: resData._id,
                    username: resData.username,
                    firstName: resData.firstName,
                    lastName: resData.lastName,
                    email: resData.email,
                    role: resData.role
                });
                setAuthDrawer(false);
                //localStorage.setItem("email", resData.email);
                //history.push("/map");
            
        }).then(res => {
            console.log('LOGGING IN... Account Context is....');
            console.log(account);

        })
        .catch(err => {
            console.log('Caught.');
            console.log(err);
            setErrMsg("Invalid Username and/or password.");
            setIsAuth(false);
            // history.push("/login");
        });


    }

    //console.log(isAuth);

    return (
        <div className={classes.login}>
            <div className={classes.login__logoContainer}>
            <LogoSVG className={classes.logo}/>
            <p className={classes.loginSubheader}>Welcome Back! Login to access additional features.</p>
            {signUpSuccess ? <p className={classes.signUpSuccess}>Signed up successfully! Please Log in.</p> : null}
            </div>
            <div className={classes.loginForm}>
            <div className={classes.loginForm__headerContainer}>
                <a href="#" className={classes.header}>Log in</a> 
            </div>
            <div className={classes.loginForm__signUpContainer}>
                <span className={classes.signUp} onClick={() => authDrawerHandler('signup')}>Sign up</span>  
            </div>  

            <div className={classes.loginForm__email}>
            <span>Email</span>
                <input
                    type="email"
                    placeholder=""
                    //value={localStorage.email ? localStorage.email : null}
                    onChange={e => setInputEmail(e.target.value)}
                    className={classes.input}
                />
            </div>

            <div className={classes.loginForm__password}>
                <span>Password</span>
                <input 
                    type="password"
                    placeholder=""
                    onChange={e => setInputPassword(e.target.value)}
                    className={classes.input}
                />
                <p className={classes.errMsg}>{errMsg}</p>
            </div>

            <div className={classes.loginForm__btn}>
                <button type="submit"
                        onClick={loginHandler}
                        className={classes.btn}>
                            Log In
                </button>
            </div>
            <div className={classes.rememberContainer}>
            <input 
                    type="checkbox"
                    className={classes.checkBox} onClick={handleCheckbox} />
                    <span className={classes.rememberContainer__text}> Remember Me </span>
            </div>
            <div className={classes.forgotPasswordContainer}>
                    <span className={classes.forgotPasswordContainer__text} onClick={() => authDrawerHandler('forgotPw')}>Forgot password?</span>   {/* //? Change to a tag with a link */}
            </div>
        </div>
        </div>
    );
};

export default LoginView;