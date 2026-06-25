const foodpartnermodel = require("../model/foodpartnermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadfile = require("../services/cloudinary");

async function foodpartnerregister(req, res) {
  const { name, email, password, phoneno, username } = req.body;
  const profilepic = req.file ? req.file.path : null;

  const isuseralreadyexists = await foodpartnermodel.findOne({ email });
  if (isuseralreadyexists) {
    res.send("Foodpartner already exinst");
  }
  const hashpass = await bcrypt.hash(password, 10);
  const fileuploadresult = await uploadfile(profilepic);

  const foodpartner = await foodpartnermodel.create({
    name,
    email,
    password: hashpass,
    phoneno,
    username,

    profilepic: fileuploadresult ? fileuploadresult.secure_url : "",
  });

  const token = jwt.sign({ id: foodpartner._id }, process.env.JWTSECRET);
  res.cookie("foodpartnerlogintoken", token);
  res.status(200).json({
    message: "foodpartner registered successfully",
    foodpartner: {
      name,
      email,
      phoneno,
      role:"foodpartner"
    },
  });
}
async function foodpartnerlogin(req, res) {
  console.log("in backend foodparner");
  const { email, password } = req.body;
  const foodpartner = await foodpartnermodel.findOne({ email });
  if (!foodpartner) {
    res.send("invalid username or passord");
  }
  const corrpassword = await bcrypt.compare(password, foodpartner.password);
  if (!corrpassword) {
    res.send("incorrect password or usernAME");
  }
  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWTSECRET,
  );
  res.cookie("foodpartnerlogintoken", token);
      res.status(200).json({
      message: "User logged in successfully",
      foodpartner: { id: foodpartner._id, name: foodpartner.name, email: foodpartner.email,role:"foodpartner" },
    });

}
function foodpartnerlogout(req, res) {
  res.clearCookie("foodpartnerlogintoken");
  res.clearCookie("registertoken");

  res.send("loged out successfully");
}
async function editprofile(req, res) {
  console.log("edit foodpartner");
  try {
    const { name, email, phoneno, username } = req.body;
    const { id } = req.params;

    const updateData = { name, email, phoneno, username };

    if (req.file) {
      const fileuploadresult = await uploadfile(req.file.path);
      updateData.profilepic = fileuploadresult.secure_url;
    }

    const updateduser = await foodpartnermodel.findByIdAndUpdate(
      id,
      updateData, 
      { new: true }
    );

    res.send(updateduser);
  } catch (err) {
    console.log("failed update", err);
    res.status(500).send("Error updating profile");
  }
}

module.exports = {
  foodpartnerregister,
  foodpartnerlogin,
  foodpartnerlogout,
  editprofile,
};
