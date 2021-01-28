import React, { useState, useContext, useEffect } from "react";

import classes from "./NavbarMobile.module.scss";
import { useHistory } from "react-router-dom";

import {
  AuthContext,
  AuthDrawerContext,
  AccountContext,
} from "../../../context/AuthContext";

import AuthDrawer from "../../AuthDrawer/AuthDrawer";

import { ReactComponent as HomeSVG } from "../../../assets/icons/home.svg";
import { ReactComponent as SearchSVG } from "../../../assets/icons/magnifying-glass.svg";
import { ReactComponent as GlobeSVG } from "../../../assets/icons/globe.svg";
import { ReactComponent as UserSVG } from "../../../assets/icons/user.svg";

import { ReactComponent as ProfileSVG } from "../../../assets/icons/profile.svg";
import { ReactComponent as EditProfileSVG } from "../../../assets/icons/edit_profile.svg";
import { MdFavoriteBorder } from "react-icons/md";
import { ReactComponent as ReportsSVG } from "../../../assets/icons/report.svg";
import { ReactComponent as LogoutSVG } from "../../../assets/icons/logout.svg";

import avatarPlaceholder from "../../../assets/images/avatar_placeholder.jpeg";

const NavbarMobile = () => {
  const [active, setActive] = useState("home");
  const [openModal, setOpenModal] = useState(false);

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
  const [account, setAccount] = useContext(AccountContext);

  const [userPicture, setUserPicture] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  let history = useHistory();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (isAuth) {
      getProfile();
    }
  }, [isAuth]);

  const getProfile = () => {
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
        setAccount({
          id: resData._id,
          firstName: resData.firstName,
          lastName: resData.lastName,
          email: resData.email,
          role: resData.role,
          profilePic: resData.profilePic,
        });

        if (resData.firstName) {
          setFirstName(resData.firstName);
        }
        if (resData.lastName) {
          setLastName(resData.lastName);
        }
        if (resData.profilePic) {
          setUserPicture(resData.profilePic);
        }
        if (resData.email) {
          setEmail(resData.email);
        }
        setIsAuth(true);

        //setIsLoading(false);
      })
      .catch((err) => {
        setIsAuth(false);
        //console.log(err);
      });
  };

  const activeHandler = (selection) => {
    switch (selection) {
      case "home":
        setActive("home");
        break;
      case "search":
        setActive("search");
        break;
      case "map":
        setActive("map");
        break;
      case "profile":
        setActive("profile");
        break;
      default:
        setActive("home");
    }
  };

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

  //console.log(account);

  return (
    <div className={classes.navbarMobile}>
      <div
        className={`${classes.navbarMobile__iconContainer} ${
          active == "home" ? classes.active : null
        }`}
        onClick={() => {
          activeHandler("home");
          history.push("/");
          setOpenModal(false);
        }}
      >
        <HomeSVG className={classes.svg} />
      </div>
      <div
        className={`${classes.navbarMobile__iconContainer} ${
          active == "search" ? classes.active : null
        }`}
        onClick={() => {
          activeHandler("search");
          //history.push("/map"); SEARCHBAR WITH LISTING
          history.push("/search");
          setOpenModal(false);
        }}
      >
        <SearchSVG className={classes.svg} />
      </div>
      <div
        className={`${classes.navbarMobile__iconContainer} ${
          active == "map" ? classes.active : null
        }`}
        onClick={() => {
          activeHandler("map");
          history.push("/map");
          setOpenModal(false);
        }}
      >
        <GlobeSVG className={classes.svg} />
      </div>
      <div
        className={`${classes.navbarMobile__iconContainer} ${
          active == "profile" ? classes.active : null
        }`}
        onClick={() => {
          activeHandler("profile");
          setOpenModal(!openModal);
        }}
      >
        <UserSVG className={classes.svg} />
      </div>
      <div
        className={`${classes.popupModal} ${
          !openModal ? classes.modalClose : null
        }`}
      >
        {isAuth && (
          <div className={classes.accountDetails}>
            <div className={classes.accountDetails__picture}>
              <img
                src={
                  userPicture
                    ? process.env.REACT_APP_BACKEND + userPicture
                    : avatarPlaceholder
                }
                className={classes.profilePic}
              />
            </div>
            <p className={classes.accountDetails__email}>{email}</p>
            <h2 className={classes.accountDetails__name}>
              {firstName} {lastName}
            </h2>
          </div>
        )}
        <div className={classes.list}>
          {!isAuth && (
            <div>
              <div className={classes.list__item}>
                <span
                  className={classes.login}
                  onClick={() => authDrawerHandler("login")}
                >
                  Login
                </span>
              </div>

              <div className={classes.list__item}>
                <span
                  className={classes.signup}
                  onClick={() => authDrawerHandler("signup")}
                >
                  Signup
                </span>
              </div>
            </div>
          )}

          {isAuth && (
            <div>
              <div className={classes.list__item}>
                <a href="/profile">
                  <div className={classes.iconContainer}>
                    <ProfileSVG className={classes.icon} />
                  </div>
                  <div className={classes.labelContainer}>
                    <span className={classes.label}>Profile</span>
                  </div>
                </a>
              </div>
              <div className={classes.list__item}>
                <a href="/editprofile/true">
                  <div className={classes.iconContainer}>
                    <EditProfileSVG className={classes.icon} />
                  </div>
                  <div className={classes.labelContainer}>
                    <span className={classes.label}>Edit Profile</span>
                  </div>
                </a>
              </div>
              <div className={classes.list__item}>
                <a href="/favourites">
                  <div className={classes.iconContainer}>
                    <MdFavoriteBorder className={classes.icon} />
                  </div>
                  <div className={classes.labelContainer}>
                    <span className={classes.label}>Favourites</span>
                  </div>
                </a>
              </div>
              <div className={classes.list__item}>
                <a href="/diveReports">
                  <div className={classes.iconContainer}>
                    <ReportsSVG className={classes.icon} />
                  </div>
                  <div className={classes.labelContainer}>
                    <span className={classes.label}>Dive Reports</span>
                  </div>
                </a>
              </div>
              {/* <div className={classes.list__item}>
                <a href="/addRequest">Request to add a dive site</a>
              </div> */}
              {/* <div className={classes.list__item}>
                //TODO: Maybe make a setting tab that has change password, edit profile and other setting options later
                <a href="/change">Change Password</a>
              </div> */}
              <div className={classes.list__item}>
                <div className={classes.iconContainer} onClick={logoutHandler}>
                  <LogoutSVG className={classes.icon} />
                </div>
                <div className={classes.labelContainer}>
                  <span className={classes.label}>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AuthDrawer />
    </div>
  );
};

export default NavbarMobile;
