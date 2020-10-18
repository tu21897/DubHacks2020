import React, { useState } from "react";

import "./Login.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (event) => {
    let newEmail = event.target.value;
    setEmail(newEmail);
    console.log(newEmail);
  }

  const changePassword = (event) => {
    let newPassword = event.target.value;
    setPassword(newPassword);
    console.log(password);
  }

  return (
    <div className="vert-center d-flex justify-content-center align-items-center">
      <Container className="form-container mb-5">
        <Row>
          <Col>
            <Form>
              <h2>Login</h2>
              <Form.Control type="email" id="input-email" placeholder="Email" className="input" value={email} onChange={changeEmail}/>
              <Form.Control type="password" id="input-password" placeholder="Password"  className="input" value={password} onChange={changePassword}/>
              <Button type="submit" id="submit-button">Login</Button>
              <a href="">Not signed up? Make an account.</a>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
