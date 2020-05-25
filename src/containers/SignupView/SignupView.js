import React, { useState } from 'react';

import classes from './SignupView.module.css';

import { Form, Button, Row, Col } from 'react-bootstrap';

const SignupView = () => {

    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");


    const signupHandler = (event) => {
        event.preventDefault();
        const username = inputUsername;
        const email = inputEmail;
        const password = inputPassword;
        const confirmPassword = inputConfirmPassword;

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
        });


    }


    return (
        <div className={classes.SignUpContainer}>
            
            <Form className={classes.SignUpForm}>
            <h1 className={classes.SignUpHeader}>Sign up</h1>
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