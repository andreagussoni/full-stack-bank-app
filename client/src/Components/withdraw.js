import React from "react";
import { Card } from "./context";
import { useAuth } from "./context.js";
import axios from "axios";

function Withdraw() {
  const [balance, setBalance] = React.useState(null);
  const [withdraw, setWithdraw] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const auth = useAuth();

  function balanceSetting() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    axios.get(`bank/${id}`, { headers: auth.authHeader() }).then((res, err) => {
      setBalance(res.data.balance);
    });
  }

  React.useEffect(() => {
    if (auth.user) {
      balanceSetting();
    }
  });

  function handleWithdraw() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    const data = {
      withdraw,
    };
    if (balance >= withdraw) {
      axios
        .put(`bank/withdraw/${id}`, data, { headers: auth.authHeader() })
        .then(setWithdraw(0), balanceSetting());
    } else {
      alert("insufficient funds, deposit first");
    }
  }

  return (
    <Card
      bgcolor="danger"
      header="Withdraw"
      status={status}
      body={
        auth.user ? (
          <>
            Balance: {balance}$
            <input
              type="number"
              className="form-control"
              id="withdraw"
              placeholder="Enter withdraw"
              value={withdraw}
              onChange={(e) => setWithdraw(Number(e.currentTarget.value))}
            />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleWithdraw}
              disabled={withdraw > 0 ? false : true}
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

export default Withdraw;
