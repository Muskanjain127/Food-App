const express = require("express");
const fooditemrouter = express.Router();
const showfooditems = require("../controller/foodlist");
const usermiddleware = require("../middleware/usermiddleware");
const itemordered = require("../controller/itemordered");
const multer = require("multer");
const {
  createfood,
  updatefooditem,
} = require("../controller/fooditemcontroller");
const foodpartnermiddleware = require("../middleware/foodpartnermiddleware");
const justfoodparnermiddleware = require("../middleware/justfoodpartnertokenverify");
const cookiepartnerid = require("../middleware/cookiepartnerid");
const {
  orderfooditems,
  orderedfooditems,
  deletefooditem,
} = require("../controller/orderedfoodlist");
const justusermiddleware = require("../middleware/justusermiddleware");
const itemorderpage = require("../controller/itemorderpage");
const getpartnerorder = require("../controller/getpartnerorder");
const deletepartneritem = require("../controller/partrnerdeleteitem");
const upload = multer({
  dest: "uploads/video",
});
fooditemrouter.post(
  "/foodpartner/cretaefood",
  foodpartnermiddleware,
  upload.single("video"),
  createfood,
);
fooditemrouter.post(
  "/update/:foodid",
  foodpartnermiddleware,
  upload.single("video"),
  updatefooditem,
);
fooditemrouter.get(
  "/foodpartner/orders/:id",
  foodpartnermiddleware,
  orderfooditems,
);

fooditemrouter.get("/user/showfooditem", usermiddleware, showfooditems);
fooditemrouter.get("/orderedfood/:userid", orderedfooditems);
fooditemrouter.delete("/cancelorder/:id", usermiddleware, deletefooditem);
fooditemrouter.get("/order/:foodid", itemorderpage);
fooditemrouter.post("/ordered/:foodid", itemordered);

fooditemrouter.delete(
  "/delete/:partnerid/:foodid",
  foodpartnermiddleware,
  deletepartneritem,
);

module.exports = fooditemrouter;
