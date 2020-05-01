import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';

import UserView from './containers/UserView/UserView';
import AdminView from './containers/AdminView/AdminView';
import Details from './containers/Details/Details';

import { AdminProvider } from './context/AdminContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { DiveSiteProvider } from './context/DiveSiteContext';

function App() {


  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>

      <Route path="/details" exact component={Details}/>

      <AuthProvider>
        <DiveSiteProvider>
          <AdminProvider>
            <Route path="/admin" exact component={AdminView}/>
          </AdminProvider>
        </DiveSiteProvider>
      </AuthProvider>

      <AuthProvider>
        <DiveSiteProvider>
          <UserProvider>
            <Route path="/" exact component={UserView}/>
          </UserProvider>
        </DiveSiteProvider>
      </AuthProvider>
           
      {/* API-KEY: AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts */}
    </div>
    </BrowserRouter>
  );
}

export default App;
