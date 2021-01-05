import React, {useContext, useEffect} from 'react';
import logo from './logo.svg';
import classes from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect, useLocation } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Footer from './containers/Footer/Footer';

import GuestView from './containers/GuestView/GuestView';
import UserView from './containers/UserView/UserView';
import DetailsView from './containers/DetailsView/DetailsView';
import LoginView from './containers/LoginView/LoginView';
import SignupView from './containers/SignupView/SignupView';
import FavouritesView from './containers/FavouritesView/FavouritesView';
import ProfileView from './containers/ProfileView/ProfileView';
import ViewProfileView from './containers/ViewProfileView/ViewProfileView';
import EditProfile from './containers/EditProfile/EditProfile';
import AddRequest from './containers/AddRequest/AddRequest';
import ChangePassword from './containers/ChangePassword/ChangePassword';
import DiveReports from './containers/DiveReports/DiveReports';
import CommunityPhotos from './containers/CommunityPhotos/CommunityPhotos';
import DiveShopView from './containers/DiveShopView/DiveShopView';



import HomeView from './containers/Home/Home';

import FooterView from './containers/FooterViews/FooterView';




import { UserProvider } from './context/UserContext';
import { AuthContext,
         AccountContext,
         LoadingContext,
         AuthDrawerContext } from './context/AuthContext';
import { DiveSiteProvider } from './context/DiveSiteContext';

//import 'filepond/dist/filepond.min.css';

function App() {

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [account, setAccount] = useContext(AccountContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  
  
  useEffect(() => {
  
    async function isLoggedIn() {

      try {
        const response = await fetch('http://localhost:8080/loggedIn',{
          method: 'GET',
          credentials: 'include',
        });
        const json = await response.json();
        console.log(json);

        if (json.isLoggedIn) {
          console.log('[loggedIn] = ' + json.user._id);
          console.log('[loggedIn] = ' + json.user);
          console.log('USER IS STILL LOGGED IN');
          setIsAuth(true);
          setAccount({
            id: json.user._id,
            username: json.user.username,
            email: json.user.email
          })
          setIsLoading(false);
        } else {
          console.log('THERE IS NO SESSION');
          setIsLoading(false);
        }

      } catch (error) {
        setIsLoading(null);
      }
    }
    isLoggedIn();
  },[])


  return (
    <BrowserRouter>
      {!isLoading && (
      <div className={classes.app}>
      <DiveSiteProvider>
        <Navbar/>
        <Route path="/" exact component={HomeView}/>
      </DiveSiteProvider>
      

      {/* <Route path="/login" component={LoginView}/> */}

      {/* <Route path="/signup" exact component={SignupView}/> */}

        <DiveSiteProvider>
          <UserProvider>
            <Route path="/mySites" exact component={UserView}/>
            <Route path="/addRequest"  exact component={AddRequest}/>
            <Route path="/changePassword"  exact component={ChangePassword}/>
            
            <Route path="/favourites" exact component={FavouritesView}/>
            <Route path="/profile" exact component={ProfileView}/>
            <Route path="/diveReports" exact component={DiveReports}/>
            <Route path="/editprofile" exact component={EditProfile}/>
    
            <Route path="/map" exact component={GuestView}/>
            <Route path="/divesite/:id" exact component={DetailsView}/>
            <Route path="/diveshop/:id" exact component={DiveShopView}/>
            <Route path="/communityphotos/:siteId" exact component={CommunityPhotos}/>
            <Route path="/profile/:userId" component={ProfileView}/>
            <Route path="/editprofile/:editProfile" component={ProfileView}/>


            </UserProvider>
        </DiveSiteProvider>

        <Route path="/about" exact component={() => <FooterView page="about"/>}/>
        <Route path="/advertise" exact component={() => <FooterView page="advertise"/>}/>
        <Route path="/news" exact component={() => <FooterView page="news"/>}/>
        <Route path="/contact" exact component={() => <FooterView page="contact"/>}/>
        <Route path="/sitemap" exact component={() => <FooterView page="sitemap"/>}/>
        <Route path="/terms" exact component={() => <FooterView page="terms"/>}/>
        <Route path="/policy" exact component={() => <FooterView page="policy"/>}/>

        {document.title != "Locus - Map" ? <Footer/> : null }
      
    </div>
    )}
    {isLoading === null && (
      <h1>Error Loading</h1>
    )}
    </BrowserRouter>
  );
}

export default App;
