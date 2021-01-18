import React, { useState } from "react";
import classes from "./ChangePassword.module.scss";

import { useHistory } from "react-router-dom";

const ChangePassword = (props) => {
  let history = useHistory();

  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPassword2, setNewPassword2] = useState();

  const [errMsg, setErrMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);

  const cancelHandler = () => {
    history.push("/profile");
  };

  const changePassword = () => {
    return fetch("http://localhost:8080/user/changePassword", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        newPassword: newPassword,
        newPassword2: newPassword2,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.success) {
          setErrMsg([]);
          setSuccessMsg(resData.message);
        } else {
          setErrMsg(["Your password is incorrect. please try again."]);
        }
      })
      .catch((err) => {
        console.log(err);

        setErrMsg(["Error. Please Try again"]);
        setSuccessMsg(null);
      });
  };

  const changeHandler = () => {
    let errArray = [];

    if (password == null || newPassword == null || newPassword2 == null) {
      errArray.push("All fields are required.");
    }

    if (password) {
      if (password.length < 8) {
        errArray.push(
          "Your password is not long enough. please re enter your password."
        );
      }
    }

    if (newPassword && newPassword2) {
      if (newPassword != newPassword2) {
        errArray.push("New passwords do not match. Please try again.");
      }
      if (newPassword.length < 8 || newPassword2.length < 8) {
        errArray.push("One of the new passwords is not long enough.");
      }
    }

    setErrMsg(errArray);

    if (errArray.length == 0) {
      if (newPassword === newPassword2) {
        changePassword();
      }
    }
  };

  return (
    <div className={classes.changePassword}>
      <div className={classes.container}>
        <h3 className={classes.header}> Change Password</h3>
        <div className={classes.grid}>
          <div className={classes.grid__input1}>
            <input
              type="password"
              className={classes.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Enter Password</span>
          </div>

          <div className={classes.grid__input2}>
            <input
              type="password"
              className={classes.input}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span>Enter New Password</span>
          </div>

          <div className={classes.grid__input3}>
            <input
              type="password"
              className={classes.input}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
            <span>Enter New Password Again</span>
          </div>

          <div className={classes.grid__cancel}>
            <button className={classes.cancel} onClick={props.closeModal}>
              {" "}
              Cancel{" "}
            </button>
          </div>
          <div className={classes.grid__change}>
            <button className={classes.change} onClick={changeHandler}>
              {" "}
              Change{" "}
            </button>
          </div>
          <div className={classes.grid__messages}>
            {errMsg.map((msg) => (
              <p className={classes.error}> {msg} </p>
            ))}
            {successMsg !== null ? (
              <span className={classes.success}> {successMsg} </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
