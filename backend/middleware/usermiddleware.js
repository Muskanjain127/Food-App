const user = require("../model/usermodel");

const jwt = require("jsonwebtoken");

async function usermiddleware(req, res, next) {
  console.log("heyyyyyyyyy");
  try{
  const logintoken = req.cookies.userlogintoken;
    console.log(logintoken);
  } catch(err)
  {console.log(err);
  if (!logintoken) {
   return res.send("pleaase login first");
  }
  try {
    console.log("v in user verified");

    const coorcookie = jwt.verify(logintoken, process.env.JWTSECRET);

    const realuser = await user.findById(coorcookie.id);
    req.user = realuser;
    console.log("user verified", realuser);

    next();
  } catch (err) {
    console.log("not verified user ", err);
  }
}
}
module.exports = usermiddleware;
