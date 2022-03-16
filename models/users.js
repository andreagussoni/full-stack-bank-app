import mongoose from "mongoose";

const Users = mongoose.model(
  "Users",
  mongoose.Schema({
    username: {
      type: String,
      unique: "true",
    },
    password: String,
    balance: Number,
    movements: [],
  })
);
export default Users;
