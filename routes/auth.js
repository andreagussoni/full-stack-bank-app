import express from "express";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";

const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH;
let refreshTokens = [];

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  Users.findOne({ username: username }, (err, user) => {
    if (err || !user) {
      res.status(401).json("user does not exist");
    } else {
      if (user.password === password) {
        const accessToken = jwt.sign(
          { username: user.username, id: user._id },
          accessTokenSecret,
          { expiresIn: "120m" }
        );
        const refreshToken = jwt.sign(
          { username: user.username, id: user._id },
          refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.json({
          accessToken,
          refreshToken,
        });
      } else {
        res.status(400).json("invalid credentials");
      }
    }
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(req.body);
  Users.findOne({ username: username }).then((user) => {
    if (user) {
      res.status(500).json("user exists");
    } else {
      Users.create(
        {
          username: username,
          password: password,
          balance: 0,
        },
        (err, result) => {
          if (err) {
            console.log(err);
            res.send("error");
          } else {
            console.log(result, "oo");
            res.send("success");
          }
        }
      );
    }
  });
});

router.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send("Logout successful");
});

export default router;
