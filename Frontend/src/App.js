import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//import AuthProvider from './Components/Auth';

import * as ROUTES from './constants/routes';

import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/Home/Home';
import LandingPage from './Components/Landing/Landing';
import SignUpPage from './Components/SignUp/SignUp';
import LoginPage from './Components/Login/Login';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <hr/>
        <Route exact path ={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
