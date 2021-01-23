import React, { useState, useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import classes from "./LoginView.module.scss";

import {
  AuthContext,
  AccountContext,
  AuthDrawerHandlerContext,
  AuthDrawerContext,
  SignUpSuccessContext,
  ShowWelcomeContext,
} from "../../context/AuthContext";

import { ReactComponent as LogoSVG } from "../../assets/logo/LocusLogo_black.svg";

const LoginView = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [account, setAccount] = useContext(AccountContext);
  const authDrawerHandler = useContext(AuthDrawerHandlerContext);
  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
  const [signUpSuccess, setSignUpSuccess] = useContext(SignUpSuccessContext);
  const [showWelcome, setShowWelcome] = useContext(ShowWelcomeContext);

  const [errMsg, setErrMsg] = useState("");

  let history = useHistory();

  const emailInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  // let passwordInput = document.getElementById("passwordInput");

  // window.addEventListener(
  //   "keydown",
  //   function (event) {
  //     switch (event.code) {
  //       case "Enter":
  //         setTimeout(() => {
  //           loginHandler();
  //           window.location.reload();
  //         }, 1000);
  //         break;
  //     }
  //   },
  //   true
  // );

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const loginHandler = () => {
    const email = inputEmail;
    const password = inputPassword;

    if (email && password) {
      //return fetch(process.env.REACT_APP_BACKEND + "api/login", {
      return fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          setIsAuth(true);
          console.log(resData);
          setAccount({
            id: resData._id,
            firstName: resData.firstName,
            lastName: resData.lastName,
            email: resData.email,
            role: resData.role,
            profilePic: resData.profilePic,
          });
          setShowWelcome(true);
          setAuthDrawer(false);
        })
        .catch((err) => {
          console.log(err);
          setErrMsg("Invalid Username and/or password.");
          setIsAuth(false);
        });
    } else {
      setErrMsg("Please fill out both the fields above.");
    }
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__logoContainer}>
        <LogoSVG className={classes.logo} />
        <p className={classes.loginSubheader}>
          Welcome Back! Login to access additional features.
        </p>
        {signUpSuccess ? (
          <p className={classes.signUpSuccess}>
            Signed up successfully! Please Log in.
          </p>
        ) : null}
      </div>
      <div className={classes.loginForm}>
        <div className={classes.loginForm__headerContainer}>
          <h3 className={classes.header}>Log in</h3>
        </div>
        <div className={classes.loginForm__signUpContainer}>
          <span
            className={classes.signUp}
            onClick={() => authDrawerHandler("signup")}
          >
            Sign up
          </span>
        </div>

        <div className={classes.loginForm__email}>
          <input
            type="email"
            ref={emailInputRef}
            placeholder=""
            onChange={(e) => setInputEmail(e.target.value)}
            className={classes.input}
          />
          <span>Email</span>
        </div>

        <div className={classes.loginForm__password}>
          <input
            type="password"
            placeholder=""
            onChange={(e) => setInputPassword(e.target.value)}
            className={classes.input}
            id="passwordInput"
          />
          <span>Password</span>
          <p className={classes.errMsg}>{errMsg}</p>
        </div>

        <div className={classes.loginForm__btn}>
          <div className={classes.btn} onClick={loginHandler}>
            Log In
          </div>
        </div>
        <div className={classes.rememberContainer}>
          <input
            type="checkbox"
            className={classes.checkBox}
            onClick={handleCheckbox}
          />
          <span className={classes.rememberContainer__text}> Remember Me </span>
        </div>
        <div className={classes.forgotPasswordContainer}>
          <span
            className={classes.forgotPasswordContainer__text}
            onClick={() => authDrawerHandler("forgotPw")}
          >
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
