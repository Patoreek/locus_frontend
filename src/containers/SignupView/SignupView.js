import React, { useState, useContext, useEffect } from "react";

import classes from "./SignupView.module.scss";

import { ReactComponent as LogoSVG } from "../../assets/logo/LocusLogo_black.svg";

import { useHistory } from "react-router-dom";

import {
  AuthDrawerHandlerContext,
  SignUpSuccessContext,
} from "../../context/AuthContext";

const SignupView = () => {
  const authDrawerHandler = useContext(AuthDrawerHandlerContext);
  const [signUpSuccess, setSignUpSuccess] = useContext(SignUpSuccessContext);

  let history = useHistory();

  const [inputUsername, setInputUsername] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  //TODO: ERROR Variables.
  const [errMsg, setErrMsg] = useState([]);
  const [usernameErr, setUsernameErr] = useState(false);
  const [firstnameErr, setFirstnameErr] = useState(false);
  const [lastnameErr, setLastnameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [password2Err, setPassword2Err] = useState(false);

  const [success, setSuccess] = useState(null);

  const [isError, setIsError] = useState(true);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const signupHandler = (event) => {
    event.preventDefault();
    const username = inputUsername;
    const firstName = inputFirstName;
    const lastName = inputLastName;
    const email = inputEmail;
    const password = inputPassword;
    const confirmPassword = inputConfirmPassword;

    setUsernameErr(false);
    setFirstnameErr(false);
    setLastnameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setPassword2Err(false);
    setIsError(true);

    let errorMessage = [];

    if (isChecked) {
      setIsError(false);
    } else {
      errorMessage.push("You havent agreed to the Terms of Service");
    }

    if (username.length >= 3 && username.length <= 16) {
      setIsError(false);
    } else {
      errorMessage.push(
        "Username must be longer than 3s characters and less than 16 characters"
      );
      setUsernameErr(true);
    }

    // Firstname and Lastname must be > 1 character and must not have numbers or symbols

    var letters = /^[a-zA-Z]+$/;

    if (firstName.match(letters)) {
      setIsError(false);
    } else {
      if (firstName == "") {
        errorMessage.push("Please add your first name.");
        setFirstnameErr(true);
      } else {
        errorMessage.push("There are numbers or symbols in your first name.");
        setFirstnameErr(true);
      }
    }

    if (firstName.length <= 1) {
      errorMessage.push("Your first name is too short.");
      setFirstnameErr(true);
    } else {
      setIsError(false);
    }

    if (lastName.length <= 2) {
      errorMessage.push("Your last name is too short.");
      setLastnameErr(true);
    } else {
      setIsError(false);
    }

    if (lastName.match(letters)) {
      setIsError(false);
    } else {
      if (lastName == "") {
        errorMessage.push("Please add your last name.");
        setLastnameErr(true);
      } else {
        errorMessage.push("There are numbers or symbols in your last name.");
        setLastnameErr(true);
      }
    }

    if (validateEmail(email)) {
      setIsError(false);
    } else {
      errorMessage.push("Invalid email");
      setEmailErr(true);
    }

    if (email.length >= 6) {
      setIsError(false);
    } else {
      errorMessage.push("Email too short");
      setEmailErr(true);
    }

    if (password.length >= 8) {
      setIsError(false);
    } else {
      errorMessage.push("Password not long enough");
      setPasswordErr(true);
    }

    if (confirmPassword.length >= 8) {
      setIsError(false);
    } else {
      errorMessage.push("Confirm Password not long enough");
      setPassword2Err(true);
    }
    if (confirmPassword == password) {
      setIsError(false);
    } else {
      errorMessage.push("Passwords do not match");
      setPassword2Err(true);
      setPasswordErr(true);
    }
    setErrMsg(errorMessage);

    if (errMsg.length === 0) {
      console.log("All Fields look good... fetching from API...");

      return fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          },
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          if (!resData.success) {
            errorMessage.push(resData.message);
            setIsError(true);
          } else {
            setSuccess(true);
            setSignUpSuccess(true);
            // errorMessage.push("Sign up successful");
            authDrawerHandler("login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //     console.log('in Use Effect.... IsError = ' + isError);
  // }, [isError])

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    // console.log(isChecked);
  };

  return (
    <div className={classes.signup}>
      <div className={classes.signup__logoContainer}>
        <LogoSVG className={classes.logo} />
        <p className={classes.loginSubheader}>
          Fill in the form below to create an account.
        </p>
      </div>

      <div className={classes.form}>
        <div className={classes.form__headerContainer}>
          <h1 className={classes.header}>Sign up</h1>
        </div>

        <div className={classes.form__username}>
          <input
            type="text"
            onChange={(e) => setInputUsername(e.target.value)}
            className={`${classes.input} ${
              usernameErr ? classes.errorBorderColor : null
            }`}
          />
          <span className={usernameErr ? classes.errorTextColor : null}>
            Username
          </span>
        </div>

        <div className={classes.form__firstName}>
          <input
            type="text"
            onChange={(e) => setInputFirstName(e.target.value)}
            className={`${classes.input} ${
              firstnameErr ? classes.errorBorderColor : null
            }`}
          />
          <span className={firstnameErr ? classes.errorTextColor : null}>
            First Name
          </span>
        </div>

        <div className={classes.form__lastName}>
          <input
            type="text"
            onChange={(e) => setInputLastName(e.target.value)}
            className={`${classes.input} ${
              lastnameErr ? classes.errorBorderColor : null
            }`}
          />
          <span className={lastnameErr ? classes.errorTextColor : null}>
            Last Name
          </span>
        </div>

        <div className={classes.form__email}>
          <input
            type="email"
            onChange={(e) => setInputEmail(e.target.value)}
            className={`${classes.input} ${
              emailErr ? classes.errorBorderColor : null
            }`}
          />
          <span className={emailErr ? classes.errorTextColor : null}>
            Email
          </span>
        </div>

        <div className={classes.form__password}>
          <input
            type="password"
            onChange={(e) => setInputPassword(e.target.value)}
            className={`${classes.input} ${
              passwordErr ? classes.errorBorderColor : null
            }`}
          />
          <span className={passwordErr ? classes.errorTextColor : null}>
            Password
          </span>
        </div>

        <div className={classes.form__passwordAgain}>
          <input
            type="password"
            onChange={(e) => setInputConfirmPassword(e.target.value)}
            className={`${classes.input} ${
              password2Err ? classes.errorBorderColor : null
            }`}
          />
          <span className={password2Err ? classes.errorTextColor : null}>
            Re-enter Password
          </span>
        </div>

        <div className={classes.form__certifyContainer}>
          <input
            type="checkbox"
            className={`${classes.checkBox} ${
              password2Err ? classes.errorBorderColor : null
            }`}
            onClick={handleCheckbox}
          />

          <p className={classes.checkBoxText}>
            {" "}
            I cerify that I am 18 years of age or older, and agree to the Terms
            of Service and Privacy Policy{" "}
          </p>
        </div>

        <div className={classes.form__errorContainer}>
          {errMsg.map((message) => (
            <p className={classes.errMsg}>{message}</p>
          ))}
        </div>

        <div className={classes.form__btnContainer}>
          <div className={classes.btn} onClick={signupHandler}>
            Sign Up
          </div>
        </div>

        <div className={classes.form__loginContainer}>
          <p> Have an account already? </p>
          <span onClick={() => authDrawerHandler("login")}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
