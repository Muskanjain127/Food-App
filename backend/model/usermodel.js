const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    profilepic: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneno: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
const usermodel = mongoose.model("users", userschema);
module.exports = usermodel;
