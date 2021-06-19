import { Form, Button, Alert, Col } from "react-bootstrap";
import { useState } from "react";
//import { Redirect } from 'react-router';

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const credentials = { username, password };

    // SOME VALIDATION, ADD MORE!!!
    let valid = true;
    if (username === "" || password === "" || password.length < 6)
      valid = false;

    if (valid) {
      props.login(credentials);
      setTimeout(function () {
        setErrorMessage("Username or password is wrong");
      }, 200);
    } else {
      // show a better error message...
      setErrorMessage("Some errors in the form!");
    }
  };

  return (
    <Form>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : ""}
      <Form.Group controlId="username">
        <Form.Label>email</Form.Label>
        <Form.Control
          type="email"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </Form.Group>
      <Button onClick={handleSubmit}>Login</Button>
    </Form>
  );
}

function LogoutButton(props) {
  return (
    <Col>
      <Button variant="outline-primary" onClick={props.logout}>
        Logout
      </Button>
    </Col>
  );
}

export { LoginForm, LogoutButton };