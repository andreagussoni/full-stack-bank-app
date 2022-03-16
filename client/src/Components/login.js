import React from "react";
import { Card, useAuth } from "./context";

function Login() {
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useAuth();

  function handleLogin() {
    if (email) {
      if (password) {
        auth
          .signin(email, password)
          .then(() => {
            setStatus("");
          })
          .catch((err) => {
            alert(err, "not an user");
          });
      } else {
        setStatus("insert password");
      }
    } else {
      setStatus("insert email");
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    auth.signout();
  }

  return (
    <Card
      bgcolor="info"
      header="Login"
      status={status}
      body={
        !auth.user ? (
          <>
            email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleLogin}
            >
              Log In
            </button>
          </>
        ) : (
          <>
            For safety reasons logout when finished
            <br />
            <br />
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              LogOut
            </button>
          </>
        )
      }
    />
  );
}

export default Login;
