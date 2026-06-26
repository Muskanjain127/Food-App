const fooditem = require("../model/fooditemmodel");
const foodpartnermodel = require("../model/foodpartnermodel");
async function showfooditems(req, res) {
  console.log("in showfooditems");
  const items = await fooditem.find({}).populate("foodpartner");
  console.log("items",items);
  res.send(items,req.user);
}
module.exports = showfooditems;
