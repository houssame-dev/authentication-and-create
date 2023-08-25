import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./Auth.css";

const Auth = () => {
  const [cookies, setCookies] = useCookies("access_token");
  const removeCookieis = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("adminID");
    window.location.reload(false);
  };
  return (
    <>
      {cookies.access_token ? (
        <Button variant="danger" onClick={removeCookieis}>
          Log Out
        </Button>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/register", { username, password });
    alert("Admin Created");
  };

  return (
    <AuthForm
      label="Register"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies(["access_token"]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/login", {
      username,
      password,
    });
    setCookies("access_token", response.data.token);
    window.localStorage.setItem("userID", response.data.adminId);
    window.location.reload(false);
  };

  return (
    <AuthForm
      label="Login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const AuthForm = ({
  label,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <Container>
      <Form className="form" onSubmit={onSubmit}>
        <h2>{label}</h2>
        <FloatingLabel label="Username" className="label">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="label">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>
        <div className="d-grid">
          <Button className="register-login-btn" size="lg" type="submit">
            {label}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Auth;
