import useProvideAuth from "../auth/useProvideAuth";
import React from "react";
import { createContext, useContext } from "react";
export const UserContext = React.createContext(null);

const authContext = createContext();

function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className="card-style">
      <div className={classes()} style={{ maxWidth: "18rem" }}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && <h5 className="card-title">{props.title}</h5>}
          {props.text && <p className="card-text">{props.text}</p>}
          {props.body}
          {props.status && <div id="createStatus">{props.status}</div>}
        </div>
      </div>
    </div>
  );
}

export { Card, useAuth, AuthProvider };
