import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import classes from "./NavbarMain.module.scss";

import { ReactComponent as GlobeSVG } from "../../../assets/icons/globe.svg";
import { ReactComponent as LogoSVG } from "../../../assets/logo/LocusLogo_black.svg";
import { ReactComponent as ReportSVG } from "../../../assets/icons/report.svg";
import { ReactComponent as AddSVG } from "../../../assets/icons/add.svg";

import { ReactComponent as ProfileSVG } from "../../../assets/icons/profile.svg";
import { ReactComponent as EditProfileSVG } from "../../../assets/icons/edit_profile.svg";
import { ReactComponent as LogoutSVG } from "../../../assets/icons/logout.svg";

import { MdFavoriteBorder } from "react-icons/md";

import AuthDrawer from "../../AuthDrawer/AuthDrawer";
import SearchBarMap from "../../SearchBarMap/SearchBarMap";
import Searchbar from "../../Searchbar/Searchbar";

import {
  AuthContext,
  AccountContext,
  AuthDrawerContext,
  PanToContext,
} from "../../../context/AuthContext";

import avatarPlaceholder from "../../../assets/images/avatar_placeholder.jpeg";

const NavbarMain = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [account, setAccount] = useContext(AccountContext);

  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);

  const panTo = useContext(PanToContext);

  const [dropdown, setDropdown] = useState(false); //! Change to False

  const [navbar, setNavbar] = useState("map");

  const [userPicture, setUserPicture] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [accountRole, setAccountRole] = useState("user");

  const [isLoading, setIsLoading] = useState(true);

  let history = useHistory();

  const getProfile = () => {
    return fetch("http://localhost:8080/user/getProfile", {
      method: "GET",
      credentials: "include",
    })
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const url = window.location.pathname;
    if (url.includes("map") || url.includes("mySites")) {
      setNavbar("map");
    } else {
      setNavbar("main");
    }
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

  const logoutHandler = () => {
    if (isAuth) {
      return fetch("http://localhost:8080/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          logout: true,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setIsAuth(false);
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

            <div className={classes.searchbarContainer}>
              {navbar === "map" ? <SearchBarMap panTo={panTo} /> : null}
              {navbar === "main" ? <Searchbar /> : null}
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

              {isAuth && (
                <div className={classes.diveReportsLink}>
                  <a href="/diveReports">
                    <ReportSVG className={classes.reportSVG} />
                  </a>
                </div>
              )}
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
                      src={"http://localhost:8080/" + userPicture}
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
                          src={"http://localhost:8080/" + userPicture}
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
                      {!isLoading && (
                        <span className={classes.email}>
                          {email ? email : "New account"}
                        </span>
                      )}
                    </div>
                    <a
                      href="/profile"
                      className={classes.dropdown__viewProfile}
                    >
                      <ProfileSVG className={classes.icon} />
                      <span>View Profile</span>
                    </a>
                    <a
                      href="/editProfile/true"
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
    </div>
  );
};

export default NavbarMain;
