import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import classes from "./NavbarHome.module.scss";
import { ReactComponent as LogoSVG } from "../../../assets/logo/LocusLogo_white.svg";
import { ReactComponent as GlobeSVG } from "../../../assets/icons/globe.svg";

import { ReactComponent as ReportSVG } from "../../../assets/icons/report.svg";
import { ReactComponent as AddSVG } from "../../../assets/icons/add.svg";

import { ReactComponent as ProfileSVG } from "../../../assets/icons/profile.svg";
import { ReactComponent as EditProfileSVG } from "../../../assets/icons/edit_profile.svg";
import { ReactComponent as LogoutSVG } from "../../../assets/icons/logout.svg";

import { MdFavoriteBorder } from "react-icons/md";

import avatarPlaceholder from "../../../assets/images/avatar_placeholder.jpeg";

import AuthDrawer from "../../AuthDrawer/AuthDrawer";
import WelcomeModal from "../../WelcomeModal/WelcomeModal";

import {
  AuthContext,
  AccountContext,
  AuthDrawerContext,
  ShowWelcomeContext,
} from "../../../context/AuthContext";

const NavbarHome = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [account, setAccount] = useContext(AccountContext);

  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

  const [showWelcome, setShowWelcome] = useContext(ShowWelcomeContext);

  const [dropdown, setDropdown] = useState(false); //! Change to False
  const [userPicture, setUserPicture] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [accountRole, setAccountRole] = useState("user");

  let history = useHistory();

  useEffect(() => {
    if (isAuth) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      getProfile();
    }
  }, [isAuth]);

  const authDrawerHandler = (option) => {
    if (option === "login") {
      setAuthDrawer({
        open: true,
        login: true,
        signup: false,
      });
    } else if (option === "signup") {
      setAuthDrawer({
        open: true,
        login: false,
        signup: true,
      });
    }
  };

  const getProfile = () => {
    console.log("getting user...");
    return fetch(
      process.env.REACT_APP_ENV == "production"
        ? "/api/user/getProfile"
        : process.env.REACT_APP_LOCAL_BACKEND + "user/getProfile",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.firstName) {
          setFirstName(resData.firstName);
        }
        if (resData.lastName) {
          setLastName(resData.lastName);
        }
        if (resData.profilePic) {
          setUserPicture(resData.profilePic);
        }
        if (resData.role) {
          setAccountRole(resData.role);
        }
        if (resData.email) {
          setEmail(resData.email);
        }
        setIsAuth(true);
      })
      .catch((err) => {
        setIsAuth(false);
        //console.log(err);
      });
  };

  const logoutHandler = () => {
    if (isAuth) {
      return fetch(
        process.env.REACT_APP_ENV == "production"
          ? "/api/logout"
          : process.env.REACT_APP_LOCAL_BACKEND + "logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            logout: true,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setIsAuth(false);
          setAccount(null);

          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <header>
        <nav
          className={`${classes.navbar} ${
            authDrawer.open ? classes.hide : null
          }`}
        >
          <div className={classes.navList}>
            <div className={classes.logoItem}>
              <a href="/">
                <LogoSVG className={classes.logo} />
              </a>
            </div>

            <div className={classes.rightNav}>
              <div className={classes.mapLink}>
                <a href="/map">
                  <GlobeSVG className={classes.globeSVG} />
                </a>
              </div>

              {isAuth && (
                <div className={classes.favouritesLink}>
                  <a href="/favourites">
                    <MdFavoriteBorder className={classes.favouriteSVG} />
                  </a>
                </div>
              )}

              {/* {isAuth && (
                <div className={classes.diveReportsLink}>
                  <a href="/diveReports">
                    <ReportSVG className={classes.reportSVG} />
                  </a>
                </div>
              )} */}
              {/* //TODO\\ HERE GOES THE PROFILE AVATAR & THE DROPDOWN WITH VIEW & EDIT PROFILE AND ALSO THE LOGOUT BTN */}
              {isAuth && (
                <div
                  className={classes.avatar}
                  onClick={() => setDropdown(!dropdown)}
                >
                  {!userPicture ? (
                    <img
                      className={classes.avatarImage}
                      src={avatarPlaceholder}
                      alt="placeholder of users face."
                    />
                  ) : null}
                  {userPicture ? (
                    <img
                      className={classes.avatarImage}
                      src={process.env.REACT_APP_BACKEND + userPicture}
                      alt="placeholder of users face."
                    />
                  ) : null}
                </div>
              )}

              {isAuth && (
                <div
                  className={`${classes.dropdown} ${
                    !dropdown ? classes.close : null
                  }`}
                >
                  <div
                    className={`${classes.dropdown__content} ${
                      !dropdown ? classes.fade : null
                    }`}
                  >
                    <div className={classes.dropdown__avatar}>
                      {!userPicture ? (
                        <img
                          className={classes.avatarImage}
                          src={avatarPlaceholder}
                          alt="placeholder of users face."
                        />
                      ) : null}
                      {userPicture ? (
                        <img
                          className={classes.avatarImage}
                          src={process.env.REACT_APP_BACKEND + userPicture}
                          alt="placeholder of users face."
                        />
                      ) : null}
                    </div>
                    <div className={classes.dropdown__name}>
                      <span className={classes.title}>
                        {firstName} {lastName}
                      </span>
                    </div>
                    <div className={classes.dropdown__email}>
                      <span className={classes.email}>{email}</span>
                    </div>
                    <a
                      href="/profile"
                      className={classes.dropdown__viewProfile}
                    >
                      <ProfileSVG className={classes.icon} />
                      <span>View Profile</span>
                    </a>
                    <a
                      href="/editprofile/true"
                      className={classes.dropdown__editProfile}
                    >
                      <EditProfileSVG className={classes.icon} />
                      <span>Edit Profile</span>
                    </a>
                    <div className={classes.dropdown__separator} />
                    <a
                      onClick={logoutHandler}
                      className={classes.dropdown__logout}
                    >
                      <LogoutSVG className={classes.icon} />
                      <span>Logout</span>
                    </a>
                  </div>
                </div>
              )}

              {isAuth && (
                <div className={classes.addSitesLink}>
                  {accountRole == "admin" ? (
                    <a href="/mySites">
                      <AddSVG className={classes.addSVG} />
                    </a>
                  ) : null}
                  {accountRole == "user" ? (
                    <a href="/addRequest">
                      <AddSVG className={classes.addSVG} />
                    </a>
                  ) : null}
                </div>
              )}

              {!isAuth ? (
                <div
                  className={`${classes.btn} ${classes.btn__login}`}
                  onClick={() => authDrawerHandler("login")}
                >
                  <span>Log in</span>
                </div>
              ) : null}
              {!isAuth ? (
                <div
                  className={`${classes.btn} ${classes.btn__signup}`}
                  onClick={() => authDrawerHandler("signup")}
                >
                  <span>Sign Up</span>
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </header>

      <AuthDrawer />
      {showWelcome ? <WelcomeModal /> : null}
    </div>
  );
};

export default NavbarHome;
