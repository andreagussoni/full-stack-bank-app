import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useAuth } from "./context.js";

function NavBar() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );
  const auth = useAuth();
  function getUser() {
    if (auth.user) {
      const splittedToken = auth.user.split(".")[1];
      const payload = Buffer.from(splittedToken, "base64");
      const decoded = JSON.parse(payload.toString());
      const user = decoded.username;
      return user;
    } else {
      return "Select user";
    }
  }

  React.useEffect(() => {
    getUser();
    console.log(getUser());
  }, [auth.user]);

  return (
    <>
      <Navbar bg="light" variant="dark">
        <Container>
          <Nav.Link className="ms-auto">
            <OverlayTrigger
              placement="left"
              delay={{ show: 50, hide: 100 }}
              overlay={renderTooltip("homepage")}
            >
              <NavLink
                exact="true"
                className="navigation"
                activeclassname="active"
                to="/"
              >
                Home
              </NavLink>
            </OverlayTrigger>
          </Nav.Link>
          <Nav className="me-auto">
            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip("Sign Up page")}
              >
                <NavLink
                  exact="true"
                  className="navigation"
                  activeclassname="active"
                  to="/createaccount"
                >
                  Create Account
                </NavLink>
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip("Access or log out your account here")}
              >
                <NavLink
                  exact="true"
                  className="navigation"
                  activeclassname="active"
                  to="/login"
                >
                  Log In
                </NavLink>
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip("click here to deposit")}
              >
                <NavLink
                  exact="true"
                  className="navigation"
                  activeclassname="active"
                  to="/deposit"
                >
                  Deposit
                </NavLink>
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip("click here to withdraw")}
              >
                <NavLink
                  exact="true"
                  className="navigation"
                  activeclassname="active"
                  to="/withdraw"
                >
                  Withdraw
                </NavLink>
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip("wired transfer")}
              >
                <NavLink
                  exact="true"
                  className="navigation"
                  activeclassname="active"
                  to="/transfer"
                >
                  Transfer
                </NavLink>
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link>
              <OverlayTrigger
                placement="right"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip("user transactions")}
              >
                <NavLink
                  exact="true"
                  className="navigation"
                  activeclassname="active"
                  to="/alldata"
                >
                  All Data
                </NavLink>
              </OverlayTrigger>
            </Nav.Link>
          </Nav>
          <Navbar.Text style={{ color: "green" }}>
            User : {getUser()}
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
