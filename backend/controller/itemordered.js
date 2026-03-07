const fooditemmodel = require("../model/fooditemmodel");
const usermodel = require("../model/usermodel");
const foodpartnermodel = require("../model/foodpartnermodel");
const orderedfood = require("../model/orderoffoodlist");
const orderoffoodmodel = require("../model/orderoffoodlist");
async function orderoffood(req, res) {
  const { foodid } = req.params;
  const { user, partner } = req.body;

  const item = await fooditemmodel.findById(foodid);
  const realuser = await usermodel.findById(user);
  const foodpartner = await foodpartnermodel.findById(partner);
  const allorderoffood = await orderoffoodmodel.create({
    foodid: item._id,
    userid: realuser._id,
    foodpartnerid: foodpartner._id,
  });
  console.log(allorderoffood);
  console.log("item ordered");
  res.send(allorderoffood);
}
module.exports = orderoffood;
