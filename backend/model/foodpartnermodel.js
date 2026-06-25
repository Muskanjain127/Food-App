const mongoose = require("mongoose");
const foodpartnerschema = new mongoose.Schema({

  role: {
      type: String,
      default: "foodpartner",
    },
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
});
const foodpartnermodel = mongoose.model("foodpartner", foodpartnerschema);
module.exports = foodpartnermodel;
