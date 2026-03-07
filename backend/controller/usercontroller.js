const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uploadfile = require("../services/cloudinary");

async function userregister(req, res) {
  const { name, email, password, phoneno, username } = req.body;
  const profilepic = req.file ? req.file.path : null;
  const isuseralreadyexists = await usermodel.findOne({ email });
  if (isuseralreadyexists) {
    res.send("user aready exists");
  }
  console.log("pass", password);
  const hashedpass = await bcrypt.hash(password, 10);
  try {
    const fileuploadresult = await uploadfile(profilepic);

    let user = await usermodel.create({
      name,
      email,
      password: hashedpass,
      phoneno,
      username,
      profilepic: fileuploadresult ? fileuploadresult.secure_url : "",
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWTSECRET,
    );
    res.cookie("userlogintoken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.send({
      messagr: "register successfully",
      userinfo: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneno: user.phoneno,
      },
    });
  } catch (err) {
    console.log("fsilrf", err);
  }
}

async function userlogin(req, res) {
  console.log("in backend userlogin");
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  console.log("user", user);

  if (!user) {
    return res.send("invalid username or password");
  }
  const corrpassword = await bcrypt.compare(password, user.password);
  console.log("user coorpassword", password);

  if (!corrpassword) {
    return res.status(400).json({
      message: "inalid username or password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWTSECRET,
  );
  res.cookie("userlogintoken", token);

  res.status(200).json({
    message: "user loged in successfuly",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}
function userlogout(req, res) {
  res.clearCookie("userlogintoken");
  res.clearCookie("registertoken");

  res.status(200).json({
    message: "logged out successfully",
  });
}

async function profilepage(req, res) {
  const { id } = req.params;
  const user = await usermodel.findById(id);
  res.send({ message: "in profile pge controller", user: user });
}
async function editprofile(req, res) {
  try {
    const { name, email, phoneno, username } = req.body;
    const { id } = req.params;
    if (req.file) {
      const profilepic = req.file.path;

      const fileuploadresult = await uploadfile(profilepic);
      updateuser.profilepic = fileuploadresult.secure_url;
    }
    let updateduser = await usermodel.findByIdAndUpdate(
      id,
      {
        name,
        email,

        phoneno,
        username,
      },
      { new: true },
    );
    res.send(updateduser);
  } catch (err) {
    console.log("faild t udate", err);
  }
}

module.exports = {
  userregister,
  userlogin,
  userlogout,
  profilepage,
  editprofile,
};
