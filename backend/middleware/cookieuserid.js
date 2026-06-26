const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");

async function cookieuserid(req, res) {
  const id = req.cookies.userlogintoken;
  try {
    const decoded = jwt.verify(id, process.env.JWTSECRET);

    const realuser = await usermodel.findById(decoded.id);
    req.user = realuser;
    console.log("user verified in cookieiddleware", realuser);
    res.send(realuser);
  } catch (err) {
    console.log("not verified user ", err);
  }
}
module.exports = cookieuserid;
