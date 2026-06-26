const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uploadfile = require("../services/cloudinary");

async function userregister(req, res) {
  try {
    const { name, email, password, phoneno, username } = req.body;

    const isUserAlreadyExists = await usermodel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    let profilePicUrl = "";

    if (req.file) {
      const fileuploadresult = await uploadfile(req.file.path);
      profilePicUrl = fileuploadresult.secure_url;
    }

    const user = await usermodel.create({
      name,
      email,
      password: hashedpass,
      phoneno,
      username,
      profilepic: profilePicUrl,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
res.cookie("userlogintoken", token, {
  httpOnly: true,
  secure: true,       
  sameSite: "none",   
  path: "/",
  maxAge:36000000
});
    return res.status(201).json({
      message: "Registered successfully",
      userinfo: { id: user._id, name: user.name, email: user.email,role:'user' },
    });

  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; 
      return res.status(409).json({ message: `${field} already exists` });
    }

    console.error("Backend Error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
async function userlogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const corrpassword = await bcrypt.compare(password, user.password);
    if (!corrpassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
    res.cookie("userlogintoken", token, { httpOnly: true, sameSite: "none",secure:true });

    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, name: user.name, email: user.email,role:'user' },
    });
  } catch (err) {
    console.error("Error in user login:", err);
    res.status(500).json({ message: "Internal server error during login" });
  }
}

function userlogout(req, res) {
  res.clearCookie("userlogintoken");
  res.clearCookie("registertoken");
  res.status(200).json({ message: "Logged out successfully" });
}

async function profilepage(req, res) {
  try {
    const { id } = req.params;
    const user = await usermodel.findById(id).select("-password");  
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile fetched successfully", user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
}

async function editprofile(req, res) {
  try {
    const { name, email, phoneno, username } = req.body;
    const { id } = req.params;
    
    let updateData = { name, email, phoneno, username };

    if (req.file) {
      const fileuploadresult = await uploadfile(req.file.path);
      updateData.profilepic = fileuploadresult.secure_url;
    }

    const updatedUser = await usermodel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
}

module.exports = { userregister, userlogin, userlogout, profilepage, editprofile };
