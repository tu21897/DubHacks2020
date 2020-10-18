import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from './constants/routes';
import { withFirebase } from './Components/Firebase';

import Navigation from './Components/Navigation/Navigation';
import HomePage from './Components/Home/Home';
//import LandingPage from './Components/Landing/Landing'; <Route exact path ={ROUTES.LANDING} component={LandingPage}/>
import SignUpPage from './Components/SignUp/SignUp';
import LoginPage from './Components/Login/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
