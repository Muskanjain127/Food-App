const fooditemmodel = require("../model/fooditemmodel");

async function itemorderpage(req, res) {
  console.log("in item ordered page");
  const { foodid } = req.params;
  console.log("foodid", foodid);
  const fooditem = await fooditemmodel.findById(foodid);
  console.log("fooditems", fooditem);
  res.send(fooditem);
}
module.exports = itemorderpage;
