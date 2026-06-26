function usermiddleware(req, res, next) {
  const logintoken = req.cookies.userlogintoken;
  if (!logintoken) {
    return res.send("pleaase login first");
  }
  next();
}
module.exports = usermiddleware;
