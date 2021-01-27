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

const NavbarMobile = () => {
  const [active, setActive] = useState("home");
  const [openModal, setOpenModal] = useState(false);

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
  const [account, setAccount] = useContext(AccountContext);

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

        // if (resData.firstName) {
        //   setFirstName(resData.firstName);
        // }
        // if (resData.lastName) {
        //   setLastName(resData.lastName);
        // }
        // if (resData.profilePic) {
        //   setUserPicture(resData.profilePic);
        // }
        // if (resData.role) {
        //   setAccountRole(resData.role);
        // }
        // if (resData.email) {
        //   setEmail(resData.email);
        // }
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
        <div className={classes.list}>
          {!isAuth && (
            <div>
              <div className={classes.list__item}>
                <span onClick={() => authDrawerHandler("login")}>Login</span>
              </div>

              <div className={classes.list__item}>
                <span onClick={() => authDrawerHandler("signup")}>Signup</span>
              </div>
            </div>
          )}

          {isAuth && (
            <div>
              <div className={classes.list__item}>
                <a href="/profile">Profile</a>
              </div>
              <div className={classes.list__item}>
                <a href="/editprofile/true">Edit Profile</a>
              </div>
              <div className={classes.list__item}>
                <a href="/favourites">Favourites</a>
              </div>
              <div className={classes.list__item}>
                <a href="/diveReports">Dive Reports</a>
              </div>
              <div className={classes.list__item}>
                <a href="/addRequest">Request to add a dive site</a>
              </div>
              {/* <div className={classes.list__item}>
                //TODO: Maybe make a setting tab that has change password, edit profile and other setting options later
                <a href="/change">Change Password</a>
              </div> */}
              <div className={classes.list__item}>
                <span onClick={logoutHandler}>Logout</span>
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
