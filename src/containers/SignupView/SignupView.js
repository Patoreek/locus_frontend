import React, { useState } from 'react';

import classes from './SignupView.module.css';

import { Form, Button, Row, Col } from 'react-bootstrap';

const SignupView = () => {

    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");


    const submitHandler = (event) => {
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
            <h1>Sign up</h1>
            <Form className={classes.SignUpForm}>
                <Form.Group as={Row} controlId="formHorizontalUsername">
                    <Form.Label column sm={4}>
                    Username:
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={e => setInputUsername(e.target.value)}/>
                    </Col>
                </Form.Group>

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


                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={4}>
                    Reenter Password:
                    </Form.Label>
                    <Col sm={8}>
                    <Form.Control 
                        type="password" 
                        placeholder="Type password again"
                        onChange={e => setInputConfirmPassword(e.target.value)}/>
                    </Col>
                </Form.Group>
  

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button type="submit" onClick={submitHandler}>Sign Up</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default SignupView;