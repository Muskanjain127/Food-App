const orderoffoodmodel = require("../model/orderoffoodlist");

const usermodel = require("../model/usermodel");
const fooditemmodel = require("../model/fooditemmodel");
async function getpartnerorder(req, res) {
  const partnerid = req.partner._id;
  const foodpartner = await orderoffoodmodel.findById(partnerid);
  const orders = await orderoffoodmodel
    .find({ foodpartnerid: partnerid })
    .populate(foodid, userid);
  res.send({ message: "in getpartnerorer controllr" }, { foodpartner, orders });
}
module.exports = getpartnerorder;
