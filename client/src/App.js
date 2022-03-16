import React from "react";

import "./App.css";
import CreateAccount from "./Components/createaccount";
import AllData from "./Components/alldata";
import { Routes, HashRouter, Route } from "react-router-dom";
import Home from "./Components/home";
import NavBar from "./Components/navbar";
import Withdraw from "./Components/withdraw";
import Deposit from "./Components/deposit";
import Login from "./Components/login";
import Transfer from "./Components/transfer";
import { AuthProvider, UserContext } from "./Components/context";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <AuthProvider>
      <HashRouter>
        <NavBar />

        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route
              path="/CreateAccount/"
              exact="true"
              element={<CreateAccount />}
            />

            <Route path="/login/" exact="true" element={<Login />} />
            <Route path="/transfer/" exact="true" element={<Transfer />} />
            <Route path="/deposit/" exact="true" element={<Deposit />} />
            <Route path="/withdraw/" exact="true" element={<Withdraw />} />
            <Route path="/alldata/" exact="true" element={<AllData />} />
          </Routes>
        </UserContext.Provider>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
