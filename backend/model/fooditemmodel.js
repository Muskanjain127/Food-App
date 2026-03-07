const mongoose = require("mongoose");
const foodpartnermodel = require("./foodpartnermodel");
const fooditemschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requird: true,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
  foodpartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: foodpartnermodel,
  },
});
const fooditemmodel = mongoose.model("fooditem", fooditemschema);
module.exports = fooditemmodel;
