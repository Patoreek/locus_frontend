import React, {useContext, useEffect} from 'react';
import logo from './logo.svg';
import classes from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


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
import EditProfileView from './containers/EditProfileView/EditProfileView';
import AddRequest from './containers/AddRequest/AddRequest';
import ChangePassword from './containers/ChangePassword/ChangePassword';


import HomeView from './containers/Home/Home';

import AboutView from './containers/FooterViews/AboutView/AboutView';
import AdvertiseView from './containers/FooterViews/AdvertiseView/AdvertiseView';
import NewsView from './containers/FooterViews/NewsView/NewsView';
import ContactView from './containers/FooterViews/ContactView/ContactView';
import SitemapView from './containers/FooterViews/SitemapView/SitemapView';
import TermsView from './containers/FooterViews/TermsView/TermsView';
import PolicyView from './containers/FooterViews/PolicyView/PolicyView';



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
      

      <Route path="/login" component={LoginView}/>

      <Route path="/signup" exact component={SignupView}/>

        <DiveSiteProvider>
          <UserProvider>
            <Route path="/mySites" exact component={UserView}/>
            <Route path="/addRequest" component={AddRequest}/>
            <Route path="/changePassword" component={ChangePassword}/>
            
            <Route path="/favourites" exact component={FavouritesView}/>
            <Route path="/profile" exact component={ProfileView}/>
            <Route path="/editprofile" exact component={EditProfileView}/>
          </UserProvider>
        </DiveSiteProvider>
  

      
        <DiveSiteProvider>
            <Route path="/map" exact component={GuestView}/>
            <Route path="/divesite/:id" component={DetailsView}/>
            <Route path="/viewprofile/:profileId" component={ViewProfileView}/>
        </DiveSiteProvider>

        <Route path="/about" component={AboutView}/>
        <Route path="/advertise" component={AdvertiseView}/>
        <Route path="/news" component={NewsView}/>
        <Route path="/contact" component={ContactView}/>
        <Route path="/sitemap" component={SitemapView}/>
        <Route path="/terms" component={TermsView}/>
        <Route path="/policy" component={PolicyView}/>

        <Footer/>
      
      {/* API-KEY: AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts */}
    </div>
    )}
    {isLoading === null && (
      <h1>Error Loading</h1>
    )}
    </BrowserRouter>
  );
}

export default App;
