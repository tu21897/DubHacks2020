import React, { useState } from "react";

import './SignUp.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const changePassword = (event) => {
      let newPassword = event.target.value;
      setPassword(newPassword);
      console.log(password);
    }

    const changeConPassword = (event) => {
      let newConPassword = event.target.value;
      setConPassword(newConPassword);
      console.log(newConPassword);
    }

    const changeEmail = (event) => {
      let newEmail = event.target.value;
      setEmail(newEmail);
      console.log(newEmail);
    }

    return (
      <div className="vert-center d-flex justify-content-center align-items-center">
        <Container className="form-container mb-5">
          <Row>
            <Col>
              <Form>
                <h2>Sign Up</h2>
                <Form.Control type="email" id="input-email" placeholder="Email" className="input" value={email} onChange={changeEmail}/>
                <Form.Control type="password" id="input-password" aria-describedby="password-help-block" placeholder="New Password"  className="input" value={password} onChange={changePassword}/>
                <Form.Text id="password-help-block" muted>
                  Andy said your password sucks
                </Form.Text>
                <Form.Control type="password" id="input-confirm-password" placeholder="Confirm Password"  className="input" value={conPassword} onChange={changeConPassword}/>
                <Button type="submit" id="submit-button">Submit</Button>
                <a href="">Already signed up? Login</a>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default SignUp;