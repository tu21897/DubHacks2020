import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import './Login.css';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
  return (
    <LoginForm />
  );
}

const INITIAL_STATE = {
  email: '',
  password: '',
  conPassword: '',
  error: null,
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.firebase.doCreateUserWithEmailAndPassword(this.email, this.password).then(authUser => {
      // Create a user in your Firebase realtime database
      return this.props.firebase.user(authUser.user.uid).set(
        {
          uid: authUser.user.uid,
        },
        { merge: true },
      );
    })
      .then(() => this.props.history.push(ROUTES.HOME))
      .catch((err) => console.log(err));
  }

  render () {
    const {
      email,
      password,
      conPassword,
      error,
    } = this.state;

    return (
      <div className="vert-center d-flex justify-content-center align-items-center">
        <Container className="form-container mb-5">
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <h2>Login</h2>
                <Form.Control type="email" id="input-email" placeholder="Email" className="input" value={email} onChange={this.onChange}/>
                <Form.Control type="password" id="input-password" aria-describedby="password-help-block" placeholder="Password"  className="input" value={password} onChange={this.onChange}/>
                <Button type="submit" id="submit-button">Login</Button>
                <Link to={ROUTES.SIGN_UP}>New account? Sign up</Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);

export default Login;

export { LoginForm };