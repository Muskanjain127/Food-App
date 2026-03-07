function justfoodpartnermiddleware(req, res, next) {
  const cookie = req.cookies.foodpartnerlogintoken;
  if (!cookie) {
    res.send("please login first");
  }
  console.group("hello");
  next();
}
module.exports = justfoodpartnermiddleware;
