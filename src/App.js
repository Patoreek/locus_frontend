import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import UserMap from './containers/UserMap/UserMap';
import Details from './containers/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Route path="/details" exact component={Details}/>
      <Route path="/" exact component={UserMap}/>
           
      {/* API-KEY: AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts */}
    </div>
    </BrowserRouter>
  );
}

export default App;
