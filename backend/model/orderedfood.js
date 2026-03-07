const mongoose = require("mongoose");
const fooditemmodel = require("../model/fooditemmodel");
const usermodel = require("../model/usermodel");
const orderedfoodschema = new mongoose.Schema({
  foodid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: fooditemmodel,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: usermodel,
  },
});
const orderedfood = mongoose.model("orderedfood", orderedfoodschema);
module.exports = orderedfood;
