import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import './SignUp.css';

import { withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp() {
  return (
    <SignUpForm />
  );
}

const INITIAL_STATE = {
  email: '',
  password: '',
  conPassword: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
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
                <h2>Sign Up</h2>
                <Form.Control type="email" id="input-email" placeholder="Email" name="email" className="input" value={email} onChange={this.onChange}/>
                <Form.Control type="password" id="input-password" aria-describedby="password-help-block" placeholder="New Password"  name="password" className="input" value={password} onChange={this.onChange.bind(this)}/>
                <Form.Text id="password-help-block" muted>
                  Please put in at least six characters.
                </Form.Text>
                <Form.Control type="password" id="input-confirm-password" placeholder="Confirm Password"  className="input" name="conPassword" value={conPassword} onChange={this.onChange.bind(this)}/>
                <Button type="submit" id="submit-button">Submit</Button>
                <Link to={ROUTES.LOGIN}>Already signed up? Login</Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUp;

export { SignUpForm };