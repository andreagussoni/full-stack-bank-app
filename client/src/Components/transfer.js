import React from "react";
import { Card } from "./context";
import { useAuth } from "./context.js";
import axios from "axios";

function Transfer() {
  const auth = useAuth();
  const [status, setStatus] = React.useState(
    "You can find your id in all data page"
  );
  const [transfer, setTransfer] = React.useState(0);
  const [balance, setBalance] = React.useState(null);
  const [idreceive, setIdReceive] = React.useState("");

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

  function handleTransfer() {
    const splittedToken = auth.user.split(".")[1];
    const payload = Buffer.from(splittedToken, "base64");
    const decoded = JSON.parse(payload.toString());
    const id = decoded.id;
    const data = {
      transfer,
    };
    if (transfer <= balance) {
      axios
        .put(`bank/transfer/${id}/${idreceive}`, data, {
          headers: auth.authHeader(),
        })
        .then(() => {
          setTransfer(0);
          balanceSetting();
          alert("Successful transfer");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("insufficient funds, deposit first");
    }
  }
  return (
    <Card
      bgcolor="primary"
      header="Wired Transfer"
      status={status}
      body={
        auth.user ? (
          <>
            Balance: {balance}$
            <input
              className="form-control"
              id="idreceive"
              placeholder="Enter receiver's id"
              value={idreceive}
              onChange={(e) => setIdReceive(e.currentTarget.value)}
            />
            <input
              type="number"
              className="form-control"
              id="transfer"
              placeholder="Enter amount"
              value={transfer}
              onChange={(e) => setTransfer(Number(e.currentTarget.value))}
            />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleTransfer}
              disabled={transfer > 0 ? false : true}
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
export default Transfer;
