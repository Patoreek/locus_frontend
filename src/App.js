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
import HomeView from './containers/Home/Home';



import { UserProvider } from './context/UserContext';
import { GuestProvider } from './context/GuestContext';
import { AuthContext,
         AccountContext,
         BusyContext } from './context/AuthContext';
import { DiveSiteProvider } from './context/DiveSiteContext';

//import 'filepond/dist/filepond.min.css';

function App() {

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [account, setAccount] = useContext(AccountContext);
  const [isBusy, setIsBusy] = useContext(BusyContext);

  //console.log('[App.js] isAuth = ' + isAuth);

  useEffect(() => {
    return fetch('http://localhost:8080/loggedIn',{
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      if (result.isLoggedIn) {
        console.log('USER IS STILL LOGGED IN');
        setIsAuth(true);
        console.log('[loggedIn] = ' + result.user._id);
        setAccount({
          id: result.user._id,
          username: result.user.username,
          email: result.user.email
        })
        setIsBusy(false);
      } else {
        console.log('THERE IS NO SESSION');
        setIsBusy(false);
      }
    }).catch(err => {
      console.log(err);
    })
  },[])
// console.log('Account:');
// console.log(account);

  return (
    <BrowserRouter>
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
          </UserProvider>
        </DiveSiteProvider>
  

      
        <DiveSiteProvider>
          <GuestProvider>
            <Route path="/details" exact component={DetailsView}/>
            <Route path="/map" exact component={GuestView}/>
          </GuestProvider>
        </DiveSiteProvider>


      
      {/* API-KEY: AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts */}
    </div>
    </BrowserRouter>
  );
}

export default App;
