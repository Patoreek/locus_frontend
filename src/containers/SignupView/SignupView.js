import React, { useState, useContext } from 'react';

import classes from './SignupView.module.scss';

import { ReactComponent as LogoSVG } from '../../assets/logo/LocusLogo_black.svg';

import { useHistory } from 'react-router-dom';

import { AuthDrawerHandlerContext} from '../../context/AuthContext';


const SignupView = () => {


    const authDrawerHandler = useContext(AuthDrawerHandlerContext);

    let history = useHistory();

    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");

    const [isChecked, setIsChecked] = useState(false);

    const [errMsg, setErrMsg] = useState([]);

    const [isError, setIsError] = useState(false);


    const signupHandler = (event) => {
        event.preventDefault();
        const username = inputUsername;
        const email = inputEmail;
        const password = inputPassword;
        const confirmPassword = inputConfirmPassword;

        let errorMessage = [];

        if (!isChecked) {
            // console.log("User hasn't ticked the checkbox");
            errorMessage.push("You havent agreed to the Terms of Service");
            setIsError(true);
        }

        if (username.length <= 3 || username.length >= 16) {
            // console.log("User hasn't ticked the checkbox");
            errorMessage.push("Username must be longer than 6 characters and less than 16 characters");
            setIsError(true);
        } 

        if (email.length <= 6) {
            // console.log("User hasn't ticked the checkbox");
            errorMessage.push("Invalid email");
            setIsError(true);
        } 

        if (password.length < 8) {
            // console.log("User hasn't ticked the checkbox");
            errorMessage.push("Password not long enough");
            setIsError(true);
        } 

        if (confirmPassword.length < 8) {
            // console.log("User hasn't ticked the checkbox");
            errorMessage.push("Confirm Password not long enough");
            setIsError(true);
        } 
        if (confirmPassword !== password) {
            // console.log("User hasn't ticked the checkbox");
            errorMessage.push("Passwords do not match");
            setIsError(true);
        } 

        setErrMsg(errorMessage);

        if (errMsg !== ""){
            setIsError(false);
        }

        if (!isError) {

            return fetch('http://localhost:8080/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword
                    }
                })
            })
            .then(res => {
                return res.json();
            })
            .then(resData => {
               
                console.log(resData);

                if (!resData.success) {
                    errorMessage.push(resData.message);
                    setIsError(true);
                } else {
                    errorMessage.push("Sign up successful");
                    history.push('/login');
                }

                
                
                
            })
            .catch(err => {
             
                console.log(err);

            });
    
        }

        

    }

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
        // console.log(isChecked);
    }

    


    return (
        <div className={classes.signup}>
             <div className={classes.signup__logoContainer}>
            <LogoSVG className={classes.logo}/>
            <p className={classes.loginSubheader}>Fill in the form below to create an account.</p>
            </div>
            
            <div className={classes.form}>
            <div className={classes.form__headerContainer}>
                <h1 className={classes.header}>Sign up</h1>
            </div>

            <div className={classes.form__username}>
                <span>Username</span>
                <input
                    type="text"
                    onChange={e => setInputUsername(e.target.value)}
                    className={classes.input}/>
            </div>
            
            <div className={classes.form__email}>
                <span>Email</span>
                <input
                    type="email"
                    onChange={e => setInputEmail(e.target.value)}
                    className={classes.input}/>
            </div>

            <div className={classes.form__password}>
                <span>Password</span>
                <input 
                    type="password"                   
                    onChange={e => setInputPassword(e.target.value)}
                    className={classes.input}/>
            </div>

            <div className={classes.form__passwordAgain}>
                <span>Re-enter Password</span>
                <input 
                    type="password" 
                    onChange={e => setInputConfirmPassword(e.target.value)}
                    className={classes.input}/>
            </div>

            <div className={classes.form__certifyContainer}>
                <input 
                    type="checkbox"
                    className={classes.checkBox} onClick={handleCheckbox} />

                    <p className={classes.checkBoxText}> I cerify that I am 18 years of age or older, and agree to the Terms of Service and Privacy Policy </p>
            </div>   
  

            <div className={classes.form__btnContainer}>
                    <button type="submit" 
                            onClick={signupHandler}
                            className={classes.btn}>Sign Up</button>
            </div>

            <div className={classes.form__loginContainer}>
                    <p> Have an account already? </p>
                    <span onClick={() => authDrawerHandler('login')}>Login</span>
            </div>
                
            </div>
        </div>
    );
};

export default SignupView;