import { useState } from "react";
import axios from "axios";

function useProvideAuth() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const signup = (username, password) => {
    return axios
      .post("auth/signup", { username, password })
      .then((res) => {
        alert("user created");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const signin = (username, password) => {
    return axios.post("auth/login", { username, password }).then((res) => {
      setUser(res.data.accessToken);
      localStorage.setItem("user", res.data.accessToken);
    });
  };

  const signout = () => {
    return axios.post("auth/logout", { token: user }).then((res) => {
      setUser(null);
      localStorage.clear();
    });
  };

  const authHeader = () => {
    return { Authorization: `Bearer ${user}` };
  };

  return {
    user,
    signup,
    signin,
    signout,
    authHeader,
  };
}

export default useProvideAuth;
