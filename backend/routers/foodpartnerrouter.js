const foodpartner = require("../controller/foodpartnercontroller");
const express = require("express");
const justverify = require("../middleware/justfoodpartnertokenverify");
const foodpartnerfooditems = require("../controller/foodpartnerfooditems");
const cookiefoodpartnerid = require("../middleware/cookiepartnerid");
const multer = require("multer");

const {
  foodpartnerregister,
  foodpartnerlogin,

  foodpartnerlogout,
  editprofile,
} = require("../controller/foodpartnercontroller");
const foodpartnermiddleware = require("../middleware/foodpartnermiddleware");
const foodpartnerrouter = express.Router();
const userrouter = express.Router();
const upload = multer({
  dest: "uploads/image",
});
foodpartnerrouter.post(
  "/register",
  upload.single("profilepic"),
  foodpartnerregister,
);
foodpartnerrouter.post("/login", foodpartnerlogin);
foodpartnerrouter.post(
  "/edit/profile/:id",
  upload.single("profilepic"),
  foodpartnermiddleware,
  editprofile,
);
foodpartnerrouter.get("/find", justverify, cookiefoodpartnerid);
foodpartnerrouter.get("/logout", foodpartnerlogout);
foodpartnerrouter.get("/:id", foodpartnerfooditems);

module.exports = foodpartnerrouter;
