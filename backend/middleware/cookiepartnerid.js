const jwt = require("jsonwebtoken");
const foodpartnermodel = require("../model/foodpartnermodel");

async function cookiefoodpartnerid(req, res, next) {
  try {
    const id = req.cookies.foodpartnerlogintoken;

    const decoded = jwt.verify(id, process.env.JWTSECRET);

    const realfoodpartner = await foodpartnermodel.findById(decoded.id);
    req.foodpartner = realfoodpartner;
    console.log("foodpartner verified", realfoodpartner);
    res.send(realfoodpartner);
  } catch (err) {
    console.log("not verified foodpartner ", err);
  }
}
module.exports = cookiefoodpartnerid;
