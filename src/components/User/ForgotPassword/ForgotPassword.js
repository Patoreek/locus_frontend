import React, { useState } from "react";

import classes from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [success, setSuccess] = useState(null);

  const sendEmail = () => {
    return fetch("http://localhost:8080/user/resetPassword/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.success) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
  };

  return (
    <div className={classes.forgotPw}>
      <div className={classes.forgotPw__headerContainer}>
        <h2 className={classes.header}>Forgot Password</h2>
      </div>
      <div className={classes.forgotPw__paragraphContainer}>
        <p className={classes.paragraph}>
          Enter your email down below and a temporary password will be made for
          you to log in with. Once you are logged in, proceed to the profile
          page and change your temporary password to your new password.
        </p>
      </div>

      <div className={classes.forgotPw__emailInputContainer}>
        <span>Email</span>
        <input
          type="email"
          placeholder=""
          onChange={(e) => setInputEmail(e.target.value)}
          className={classes.emailInput}
        />
      </div>

      <div className={classes.forgotPw__btnContainer}>
        <button type="submit" onClick={sendEmail} className={classes.btn}>
          Send
        </button>
      </div>

      <div className={classes.forgotPw__messageContainer}>
        {success != null && (
          <span
            className={`${classes.message} ${
              success ? classes.message__success : classes.message__error
            }`}
          >
            {success
              ? "An email has been sent to this address"
              : "No email was found, please try again."}
          </span>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
