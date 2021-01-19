import React, { useState, useContext, useEffect } from "react";

import classes from "./WelcomeModal.module.scss";

import { AccountContext, ShowWelcomeContext } from "../../context/AuthContext";

import { ReactComponent as CloseSVG } from "../../assets/icons/close.svg";

import avatarPlaceholder from "../../assets/images/avatar_placeholder.jpeg";

const WelcomeModal = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [showWelcome, setShowWelcome] = useContext(ShowWelcomeContext);

  console.log(account);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (account) {
      if (account.firstName) {
        setFirstName(account.firstName);
      }
      if (account.lastName) {
        setLastName(account.lastName);
      }
      if (account.profilePic) {
        setPicture("http://localhost:8080/" + account.profilePic);
      }
    }
  }, [account]);

  return (
    <div className={classes.overlay} onClick={() => setShowWelcome(false)}>
      <div className={classes.welcomeModal}>
        <CloseSVG
          className={classes.welcomeModal__close}
          onClick={() => setShowWelcome(false)}
        />
        <h1 className={classes.welcomeModal__welcome}>
          Welcome, {firstName ? firstName : null} {lastName ? lastName : null}!
        </h1>
        <div className={classes.avatarContainer}>
          <img
            className={classes.avatarContainer__img}
            src={picture ? picture : avatarPlaceholder}
          />
        </div>
        <p className={classes.welcomeModal__profile}>
          Check out your <a href="/profile">profile</a> or add some{" "}
          <a href="/favourites">favourites.</a>
        </p>
        <p className={classes.welcomeModal__reports}>
          <a href="diveReports">Dive reports</a> are also available.
        </p>
        <p className={classes.welcomeModal__add}>
          You can also <a href="addrequest">request to add a dive site.</a>
        </p>
      </div>
    </div>
  );
};

export default WelcomeModal;
