import express from "express";
import Users from "../models/users.js";

const router = express.Router();

//DEPOSIT ROUTE
router.put("/deposit/:id", (req, res) => {
  const deposit = req.body.deposit;
  const id = req.params.id;
  console.log(req.params.id);
  Users.findByIdAndUpdate(
    id,
    {
      $inc: { balance: deposit },
      $push: { movements: `deposit: ${deposit}` },
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send("success");
      }
    }
  );
});

//WITHDRAW ROUTE
router.put("/withdraw/:id", (req, res) => {
  const withdraw = req.body.withdraw;
  const id = req.params.id;
  console.log(req.params.id);
  Users.findByIdAndUpdate(
    id,
    {
      $inc: { balance: -withdraw },
      $push: { movements: `withdraw: ${withdraw}` },
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send("success");
      }
    }
  );
});

// TRANSFER
router.put("/transfer/:idsend/:idreceive", (req, res) => {
  const idsend = req.params.idsend;
  const idreceive = req.params.idreceive;
  const transfer = req.body.transfer;
  async function transferFn() {
    try {
      let sender = Users.findByIdAndUpdate(idsend, {
        $inc: { balance: -transfer },
        $push: { movements: `sent: ${transfer}` },
      });
      let receiver = Users.findByIdAndUpdate(idreceive, {
        $inc: { balance: transfer },
        $push: { movements: `received: ${transfer}` },
      });
      let result = await Promise.all([sender, receiver]);
    } catch (err) {
      console.log(err);
    }
  }
  transferFn().then(res.send("okay"));
});

//ALLDATA ROUTE
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id, "balance movements", (err, data) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      res.send(data);
    }
  });
});

export default router;
