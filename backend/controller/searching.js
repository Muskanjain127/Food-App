const foodpartner = require("../model/foodpartnermodel");
async function searchfoodpartner(req, res) {
  const { searchingvalue } = req.body;
  const foodpartners = await foodpartner.find({
    username: { $regex: searchingvalue, $options: "i" },
  });
  console.log(foodpartners);
  res.send(foodpartners);
}
module.exports = searchfoodpartner;
