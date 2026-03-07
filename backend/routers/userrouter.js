const user = require("../controller/usercontroller");
const searching = require("../controller/searching");
const usermiddleware = require("../middleware/usermiddleware");
const justuserverify = require("../middleware/justusermiddleware");
const cookieuserid = require("../middleware/cookieuserid");
const express = require("express");
const multer = require("multer");

const userrouter = express.Router();
const upload = multer({
  dest: "uploads/image",
});
userrouter.get("/find", justuserverify, cookieuserid);

userrouter.post(
  "/edit/profile/:id",
  upload.single("profilepic"),
  usermiddleware,
  user.editprofile,
);

userrouter.post("/register", upload.single("profilepic"), user.userregister);
userrouter.post("/login", user.userlogin);
userrouter.get("/logout", justuserverify, user.userlogout);
userrouter.get("/profile/:id", justuserverify, user.profilepage);
userrouter.post("/searching", usermiddleware, searching);

module.exports = userrouter;
