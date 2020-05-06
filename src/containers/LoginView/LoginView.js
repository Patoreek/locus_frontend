import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import classes from './LoginView.module.css';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { AuthContext, TokenContext, AccountContext } from '../../context/AuthContext';


const LoginView = () => {

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [token, setToken] = useContext(TokenContext);
    const [account, setAccount] = useContext(AccountContext);


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
                user: {
                    email: email,
                    password: password
                }
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if (resData.userId !== null){
                console.log(resData);
                setToken(resData.token);
                setIsAuth(true);
                    setAccount({
                        id: resData.userId,
                        username: resData.username
                    })
                history.push("/mySites");
            }
        })
        .catch(err => {
            console.log('Caught.');
            console.log(err);
            setIsAuth(false);
            history.push("/login");
        });


    }

    //console.log(isAuth);

    return (
        <div className={classes.LoginContainer}>
            <Form className={classes.LoginForm}>
            <h1 className={classes.LoginHeader}>Log in</h1>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                    Email:
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={e => setInputEmail(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={4}>
                    Password:
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control 
                        type="password"
                        placeholder="Password"
                        onChange={e => setInputPassword(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button type="submit" onClick={loginHandler}>Log In</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 1 }}>
                    <a href='/signup'>Create an account</a>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LoginView;