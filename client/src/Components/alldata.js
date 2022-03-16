import axios from "axios";
import React, { useEffect } from "react";
import { Card, useAuth } from "./context";

function AllData() {
  const [balance, setBalance] = React.useState(null);
  const [movements, setMovements] = React.useState([]);
  const [id, setId] = React.useState(null);
  const auth = useAuth();

  // const id = function getId() {
  //   if (auth.user) {
  //     const splittedToken = auth.user.split(".")[1];
  //     const payload = Buffer.from(splittedToken, "base64");
  //     const decoded = JSON.parse(payload.toString());
  //     const id = decoded.id;
  //     return id;
  //   }
  // };

  function fetchDataBalance() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    axios.get(`bank/${id}`, { headers: auth.authHeader() }).then((res) => {
      setBalance(res.data.balance);
      setId(id);
    });
  }
  function fetchDataMovments() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    axios.get(`bank/${id}`, { headers: auth.authHeader() }).then((res) => {
      setMovements(res.data.movements);
    });
  }

  useEffect(() => {
    if (auth.user) {
      fetchDataBalance();
      fetchDataMovments();
    }
  }, []);

  return (
    <Card
      header="Users list and Movements"
      bgcolor="dark"
      body={
        auth.user ? (
          <>
            Your id: {id}
            <br />
            <br />
            Balance: {balance}
            <br />
            <br />
            Movements:{" "}
            {movements.map((item, key) => (
              <li value={key}>{item}</li>
            ))}
          </>
        ) : (
          <>
            Please select account to show movements
            <br />
            <br />
          </>
        )
      }
    />
  );
}

export default AllData;
