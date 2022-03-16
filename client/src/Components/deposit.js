import React from "react";
import { Card } from "./context";
import { useAuth } from "./context.js";
import axios from "axios";

function Deposit() {
  const [balance, setBalance] = React.useState(null);
  const [deposit, setDeposit] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const auth = useAuth();

  function balanceSetting() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    axios.get(`bank/${id}`, { headers: auth.authHeader() }).then((res) => {
      setBalance(res.data.balance);
    });
  }

  React.useEffect(() => {
    if (auth.user) {
      balanceSetting();
    }
  }, []);

  function handleDeposit() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    const data = {
      deposit,
    };
    axios
      .put(`bank/deposit/${id}`, data, { headers: auth.authHeader() })
      .then(setDeposit(0), balanceSetting());
  }

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      status={status}
      body={
        auth.user ? (
          <>
            Balance: {balance}$
            <input
              type="number"
              className="form-control"
              id="deposit"
              placeholder="Enter deposit"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.currentTarget.value))}
            />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
              disabled={deposit >= 0 ? false : true}
            >
              Confirm
            </button>
          </>
        ) : (
          <>Please select account</>
        )
      }
    />
  );
}

export default Deposit;
