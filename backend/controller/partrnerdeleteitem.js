const foodpartnermodel = require("../model/foodpartnermodel");
const fooditemmodel = require("../model/fooditemmodel");
async function deletepartneriem(req, res) {
  const { foodid, partnerid } = req.params;
  const deleteitem = await fooditemmodel.findByIdAndDelete(foodid);

  res.send(deleteitem);
}
module.exports = deletepartneriem;
