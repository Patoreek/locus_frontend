import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';

import GuestView from './containers/GuestView/GuestView';
import UserView from './containers/UserView/UserView';
import DetailsView from './containers/DetailsView/DetailsView';
import LoginView from './containers/LoginView/LoginView';
import SignupView from './containers/SignupView/SignupView';
import FavouritesView from './containers/FavouritesView/FavouritesView';
import ProfileView from './containers/ProfileView/ProfileView';



import { UserProvider } from './context/UserContext';
import { GuestProvider } from './context/GuestContext';
import { AuthProvider } from './context/AuthContext';
import { DiveSiteProvider } from './context/DiveSiteContext';

//import 'filepond/dist/filepond.min.css';

function App() {


  return (
    <BrowserRouter>
    <div className="App">
    <AuthProvider>
      <Navbar/>

      <Route path="/login" exact component={LoginView}/>

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
            <Route path="/" exact component={GuestView}/>
          </GuestProvider>
        </DiveSiteProvider>
      </AuthProvider>
           
      {/* API-KEY: AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts */}
    </div>
    </BrowserRouter>
  );
}

export default App;
