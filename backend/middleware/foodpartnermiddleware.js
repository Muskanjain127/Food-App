const fooditemmodel = require("../model/fooditemmodel");
const jwt = require("jsonwebtoken");

const foodpartnermodel = require("../model/foodpartnermodel");
async function foodpartnermiddleware(req, res, next) {
  console.log("in foodpartner middleare");
  const cookie = req.cookies.foodpartnerlogintoken;
  console.log("in foodpartner middleare", cookie);

  if (!cookie) {
    return res.send("please login first");
  }
  try {
    const coorcokkie = jwt.verify(cookie, process.env.JWTSECRET);
    const realfoodpartner = await foodpartnermodel.findById(coorcokkie.id);
    console.log(realfoodpartner);
    req.foodpartner = realfoodpartner;
    console.log("in foodpartner verified");

    next();
  } catch (err) {
    return console.log("the error in foodpartner middleware", err);
  }
}
module.exports = foodpartnermiddleware;
