import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import classes from "./App.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Redirect, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./containers/Footer/Footer";

import GuestView from "./containers/GuestView/GuestView";
import UserView from "./containers/UserView/UserView";
import DiveSiteView from "./containers/DiveSiteView/DiveSiteView";
import FavouritesView from "./containers/FavouritesView/FavouritesView";
import ProfileView from "./containers/ProfileView/ProfileView";
import AddRequest from "./containers/AddRequest/AddRequest";
import ChangePassword from "./components/User/ChangePassword/ChangePassword";
import DiveReports from "./containers/DiveReports/DiveReports";
import CommunityPhotos from "./containers/CommunityPhotos/CommunityPhotos";
import DiveShopView from "./containers/DiveShopView/DiveShopView";
import MobileSearchPanel from "./containers/MobileSearchPanel/MobileSearchPanel";

import HomeView from "./containers/Home/Home";

import FooterView from "./containers/FooterViews/FooterView";

import Spinner from "./components/Spinner/Spinner";

import { UserProvider } from "./context/UserContext";
import {
  AuthContext,
  AccountContext,
  LoadingContext,
  AuthDrawerContext,
} from "./context/AuthContext";
import { DiveSiteProvider } from "./context/DiveSiteContext";

//import 'filepond/dist/filepond.min.css';

function App() {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [account, setAccount] = useContext(AccountContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  useEffect(() => {
    async function isLoggedIn() {
      try {
        const response = await fetch(
          process.env.REACT_APP_ENV == "production"
            ? process.env.REACT_APP_BACKEND + "loggedIn"
            : process.env.REACT_APP_LOCAL_BACKEND + "loggedIn",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const json = await response.json();
        //console.log(json);

        if (json.isLoggedIn) {
          setIsAuth(true);
          setAccount({
            id: json.user._id,
            username: json.user.username,
            email: json.user.email,
          });
          setIsLoading(false);
        } else {
          //console.log("THERE IS NO SESSION");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(null);
      }
    }
    isLoggedIn();
  }, []);

  // useEffect(() => {
  //   console.log(isAuth);
  // }, [isAuth]);

  return (
    <BrowserRouter>
      {isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {!isLoading && !isMobile && (
        <div className={classes.app}>
          <DiveSiteProvider>
            <Navbar />
            <Route path="/" exact component={HomeView} />
          </DiveSiteProvider>

          {/* <Route path="/login" component={LoginView}/> */}

          {/* <Route path="/signup" exact component={SignupView}/> */}

          <DiveSiteProvider>
            <UserProvider>
              <Route
                path="/mySites"
                exact
                render={() => (isAuth ? <UserView /> : null)}
              />
              <Route
                path="/addRequest"
                exact
                render={() => (isAuth ? <AddRequest /> : null)}
              />
              <Route
                path="/changePassword"
                exact
                render={() => (isAuth ? <ChangePassword /> : null)}
              />

              <Route
                path="/favourites"
                exact
                render={() => (isAuth ? <FavouritesView /> : null)}
              />
              <Route path="/userprofile/:userId" component={ProfileView} />
              <Route
                path="/profile"
                exact
                render={() => (isAuth ? <ProfileView /> : null)}
              />

              <Route
                path="/editprofile/:editProfile"
                render={() => (isAuth ? <ProfileView /> : null)}
              />
              <Route
                path="/diveReports"
                exact
                render={() => (isAuth ? <DiveReports /> : null)}
              />

              <Route path="/divesite/:id" exact component={DiveSiteView} />
              <Route path="/diveshop/:id" exact component={DiveShopView} />
              <Route
                path="/communityphotos/:siteId"
                exact
                component={CommunityPhotos}
              />
              <Route path="/map" exact component={GuestView} />
            </UserProvider>
          </DiveSiteProvider>

          <Route
            path="/about"
            exact
            component={() => <FooterView page="about" />}
          />
          <Route
            path="/advertise"
            exact
            component={() => <FooterView page="advertise" />}
          />
          <Route
            path="/news"
            exact
            component={() => <FooterView page="news" />}
          />
          <Route
            path="/contact"
            exact
            component={() => <FooterView page="contact" />}
          />
          <Route
            path="/sitemap"
            exact
            component={() => <FooterView page="sitemap" />}
          />
          <Route
            path="/terms"
            exact
            component={() => <FooterView page="terms" />}
          />
          <Route
            path="/policy"
            exact
            component={() => <FooterView page="policy" />}
          />

          {document.title != "Locus - Map" ? <Footer /> : null}
        </div>
      )}
      {/* {isLoading === null && <h1>Error Loading</h1>} */}
      {isMobile && (
        <div className={classes.app}>
          <DiveSiteProvider>
            <Navbar />
            <Route path="/" exact component={HomeView} />
            <Route path="/map/:view" exact component={GuestView} />{" "}
            {/* depending the 'view' it will load the map but change whether you see the map or the listings with the searchbar*/}
            {/* A new component that is a simple list of login, signup. if logged in then show profile, edit profile, dive reports, request to add a site, logout, change password. These will link to a page / modal*/}
            <UserProvider>
              <Route
                path="/mySites"
                exact
                render={() => (isAuth ? <UserView /> : null)}
              />
              <Route
                path="/addRequest"
                exact
                render={() => (isAuth ? <AddRequest /> : null)}
              />
              <Route
                path="/changePassword"
                exact
                render={() => (isAuth ? <ChangePassword /> : null)}
              />
              <Route
                path="/favourites"
                exact
                render={() => (isAuth ? <FavouritesView /> : null)}
              />
              <Route path="/userprofile/:userId" component={ProfileView} />
              <Route
                path="/profile"
                exact
                render={() => (isAuth ? <ProfileView /> : null)}
              />
              <Route
                path="/editprofile/:editProfile"
                render={() => (isAuth ? <ProfileView /> : null)}
              />
              <Route
                path="/diveReports"
                exact
                render={() => (isAuth ? <DiveReports /> : null)}
              />
              <Route path="/search" exact component={MobileSearchPanel} />

              <Route path="/divesite/:id" exact component={DiveSiteView} />
              <Route path="/diveshop/:id" exact component={DiveShopView} />
              <Route
                path="/communityphotos/:siteId"
                exact
                component={CommunityPhotos}
              />
              <Route path="/map" exact component={GuestView} />
            </UserProvider>
          </DiveSiteProvider>
          <Route
            path="/about"
            exact
            component={() => <FooterView page="about" />}
          />
          <Route
            path="/advertise"
            exact
            component={() => <FooterView page="advertise" />}
          />
          <Route
            path="/news"
            exact
            component={() => <FooterView page="news" />}
          />
          <Route
            path="/contact"
            exact
            component={() => <FooterView page="contact" />}
          />
          <Route
            path="/sitemap"
            exact
            component={() => <FooterView page="sitemap" />}
          />
          <Route
            path="/terms"
            exact
            component={() => <FooterView page="terms" />}
          />
          <Route
            path="/policy"
            exact
            component={() => <FooterView page="policy" />}
          />
          {document.title != "Locus - Map" ? <Footer /> : null}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
