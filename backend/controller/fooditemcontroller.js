const fooditemmodel = require("../model/fooditemmodel");
const uploadfile = require("../services/cloudinary");
const { v4: uuid } = require("uuid");
async function createfood(req, res) {
  console.log(req.foodpartner);

  console.log(req.body);
  console.log(req.file);

  try {
    const fileuploadresult = await uploadfile(req.file.path);
    console.log("file upload result", fileuploadresult);
    const fooditem = await fooditemmodel.create({
      name: req.body.name,
      price: req.body.price,
      video: fileuploadresult.secure_url,
      description: req.body.description,
      foodpartner: req.foodpartner._id,
    });
    console.log(fileuploadresult);

    console.log("file uploaded", fileuploadresult);
    console.log("fooooooooooooos item", fooditem);

    return res.status(201).json({
      message: "created",
      fooditem,
    });
  } catch (err) {
    console.log("error", err);
  }
}
async function updatefooditem(req, res) {
  try {
    console.log("in editttt");
    const { foodid } = req.params;
    const { name, price, description } = req.body;
    if (req.file) {
      const video = req.file.path;
      const fileuploadresult = await uploadfile(video);
      updateitem.video = fileuploadresult.secure_url;
    }

    const updateitem = await fooditemmodel.findByIdAndUpdate(
      foodid,
      {
        name,
        price,
        description,
        foodpartner: req.foodpartner._id,
      },
      { new: true },
    );
    res.send(updateitem);
  } catch (err) {
    console.log("faild t udate", err);
  }
}
module.exports = { createfood, updatefooditem };
