const orderedfoodmodel = require("../model/orderoffoodlist");

async function orderedfooditems(req, res) {
  try {
    const { userid } = req.params;

    const orderedfood = await orderedfoodmodel
      .find({
        userid: userid,
      })
      .populate("foodid");
    res.send(orderedfood);
    console.log("orderfood", orderedfood);
  } catch (err) {
    console.log(err);
  }
}
async function orderfooditems(req, res) {
  try {
    const { id } = req.params;

    const orders = await orderedfoodmodel
      .find({
        foodpartnerid: id,
      })
      .populate("foodid userid");
    console.log("orderfood", orders);

    res.send(orders);
  } catch (err) {
    console.log(err);
  }
}

async function deletefooditem(req, res) {
  const { id } = req.params;
  const orderedfooditemlist = await orderedfoodmodel.findByIdAndDelete(id);
  res.send(orderedfooditemlist);
}

module.exports = { orderedfooditems, deletefooditem, orderfooditems };
