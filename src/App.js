import React, {useContext, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';

import GuestView from './containers/GuestView/GuestView';
import UserView from './containers/UserView/UserView';
import DetailsView from './containers/DetailsView/DetailsView';
import LoginView from './containers/LoginView/LoginView';
import SignupView from './containers/SignupView/SignupView';
import FavouritesView from './containers/FavouritesView/FavouritesView';
import ProfileView from './containers/ProfileView/ProfileView';
import EditProfileView from './containers/EditProfileView/EditProfileView';

import HomeView from './containers/Home/Home';



import { UserProvider } from './context/UserContext';
import { AuthContext,
         AccountContext,
         LoadingContext } from './context/AuthContext';
import { DiveSiteProvider } from './context/DiveSiteContext';

//import 'filepond/dist/filepond.min.css';

function App() {

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [account, setAccount] = useContext(AccountContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  //console.log('[App.js] isAuth = ' + isAuth);

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
      <div className="App">
      <Navbar/>
      
      <Route path="/" exact component={HomeView}/>

      <Route path="/login" component={LoginView}/>

      <Route path="/signup" exact component={SignupView}/>

        <DiveSiteProvider>
          <UserProvider>
            <Route path="/mySites" exact component={UserView}/>
            <Route path="/favourites" exact component={FavouritesView}/>
            <Route path="/profile" exact component={ProfileView}/>
            <Route path="/editprofile" exact component={EditProfileView}/>
          </UserProvider>
        </DiveSiteProvider>
  

      
        <DiveSiteProvider>
            <Route path="/map" exact component={GuestView}/>
            <Route path="/details/:siteId" component={DetailsView}/>
        </DiveSiteProvider>


      
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
