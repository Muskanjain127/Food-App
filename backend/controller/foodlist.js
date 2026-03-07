const fooditem = require("../model/fooditemmodel");
const foodpartnermodel = require("../model/foodpartnermodel");
async function showfooditems(req, res) {
  const items = await fooditem.find({}).populate("foodpartner");
  res.send(items);
}
module.exports = showfooditems;
