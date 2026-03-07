const fooditemmodel = require("../model/fooditemmodel");
const usermodel = require("../model/usermodel");
const foodpartnermodel = require("../model/foodpartnermodel");

const mongoose = require("mongoose");
const orderoffoodschema = new mongoose.Schema({
  foodid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: fooditemmodel,
  },
  foodpartnerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: foodpartnermodel,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: usermodel,
  },
});
const orderoffood = mongoose.model("orderoffood", orderoffoodschema);
module.exports = orderoffood;
