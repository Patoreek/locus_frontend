import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import classes from './LoginView.module.css';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { AuthContext, AccountContext } from '../../context/AuthContext';


const LoginView = () => {

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [account, setAccount] = useContext(AccountContext);

    const [errMsg, setErrMsg] = useState("");


    let history = useHistory();


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
           
            console.log(resData);
            setIsAuth(true);
                setAccount({
                    id: resData._id,
                    username: resData.username,
                    email: resData.email
                }) 
                history.push("/map");
            
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
        <div className={classes.LoginContainer}>
            <Form className={classes.LoginForm}>
            <h1 className={classes.LoginHeader}>Log in</h1>
            <p className={classes.LoginSubheader}>Welcome Back! Login to access additional features.</p>
            <p className={classes.errorMessage}>{errMsg}</p>
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
                            className={classes.formGroup}>
                  
                    <Button type="submit"
                            onClick={loginHandler}
                            className={classes.formInput}>Log In</Button>
                </Form.Group>
                <Form.Group as={Row}
                            className={classes.formGroup}>
                    
                    <a href='/signup'>Create an account</a>
    
                </Form.Group>
            </Form>
        </div>
    );
};

export default LoginView;