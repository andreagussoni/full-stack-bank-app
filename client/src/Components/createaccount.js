import React from "react";
import { Card } from "./context";
import { useAuth } from "./context.js";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = useAuth();

  //email validation regex
  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  function handleCreate() {
    //check name
    if (validateEmail(email)) {
      // check email
      if (password.length >= 8) {
        // api call
        auth.signup(email, password).then(() => {
          setShow(false);
          setStatus("");
        });
      } else {
        setStatus("password must be longer than 8 characters");
      }
    } else {
      setStatus("not an email");
    }
  }

  function clearForm() {
    //reset form
    setPassword("");
    setEmail("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Email address
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
              disabled={email.length > 0 && password.length > 0 ? false : true}
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Succes</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}

export default CreateAccount;
