import React, { useState } from 'react';

import classes from './SignupView.module.css';

import { useHistory } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';

const SignupView = () => {

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
            errorMessage.push("User hasn't ticked checkbox");
            setIsError(true);
        }

        if (username.length <= 6 || username.length >= 16) {
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
        <div className={classes.SignUpContainer}>
            
            <Form className={classes.SignUpForm}>
            <h1 className={classes.SignUpHeader}>Sign up</h1>

            <ul>
                {errMsg.map(msg => (
                    // // console.log("IN loop");
                    // // console.log(msg);
                    <li className={classes.errorMessage}> {msg} </li>
                ))}
                {/* <li className={classes.errorMessage}> {errMsg[0]} </li>
                <li className={classes.errorMessage}> {errMsg[1]} </li> */}
            </ul>

                <Form.Group as={Row} 
                            controlId="formHorizontalUsername"
                            className={classes.formGroup}>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={e => setInputUsername(e.target.value)}
                        className={classes.formInput}/>
                </Form.Group>

                <Form.Group as={Row}
                            controlId="formHorizontalEmail"
                            className={classes.formGroup}>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={e => setInputEmail(e.target.value)}
                        className={classes.formInput}/>
                </Form.Group>

                <Form.Group as={Row}
                            controlId="formHorizontalPassword"
                            className={classes.formGroup}>
                    <Form.Control 
                        type="password"
                        placeholder="Password"
                        onChange={e => setInputPassword(e.target.value)}
                        className={classes.formInput}/>
                </Form.Group>


                <Form.Group as={Row} 
                            controlId="formHorizontalPassword"
                            className={classes.formGroup}>
                    <Form.Control 
                        type="password" 
                        placeholder="Type password again"
                        onChange={e => setInputConfirmPassword(e.target.value)}
                        className={classes.formInput}/>
                </Form.Group>

                <Form.Group as={Row} 
                            controlId="formHorizontalCheckbox"
                            className={classes.formGroup}>
                    <Form.Check 
                        type="checkbox"
                        className={classes.checkBox} onClick={handleCheckbox} />

                    <p className={classes.checkBoxText}> I cerify that I am 18 years of age or older, and agree to the Terms of Service and Privacy Policy </p>
                </Form.Group>
  

                <Form.Group as={Row}
                            className={classes.formGroup}>
                    <Button type="submit" 
                            onClick={signupHandler}
                            className={classes.formInput}>Sign Up</Button>
                </Form.Group>

                <Form.Group as={Row}
                            className={classes.formGroup}>
                    <p> Have an account already? </p>
                    <a href='/login'>Login</a>
                </Form.Group>
            </Form>
        </div>
    );
};

export default SignupView;