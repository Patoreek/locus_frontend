import React, { useState } from "react";
import classes from "./ChangePassword.module.scss";

import { useHistory } from "react-router-dom";

const ChangePassword = (props) => {
  let history = useHistory();

  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPassword2, setNewPassword2] = useState();

  const [errMsg, setErrMsg] = useState(null);
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
          setErrMsg(null);
          setSuccessMsg(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("Error. Please Try again.");
        setSuccessMsg(null);
      });
  };

  const changeHandler = () => {
    if (password == null || newPassword == null || newPassword2 == null) {
      setErrMsg("All fields are required.");
    }
    if (newPassword != newPassword2) {
      setErrMsg("Passwords do not match. Please try again.");
    }
    if (newPassword === newPassword2 && password !== null) {
      changePassword();
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
            {errMsg !== null ? (
              <span className={classes.error}> {errMsg} </span>
            ) : null}
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
