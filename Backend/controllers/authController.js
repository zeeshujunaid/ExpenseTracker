const User = require("../models/User");
const jwt = require("jsonwebtoken");

// generating jwt token
const generateToken = (id,fullname,email) => {
  return jwt.sign({ id,fullname,email, }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// register user
exports.registerUser = async (req, res) => {
  const { fullname, email, password, profileImgurl } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  if(!profileImgurl){
    return res.status(400).json({ message: "Please Select an Image" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      fullname,
      email,
      password,
      profileImgurl,
    });

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: generateToken(user._id, user.fullname, user.email)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get user info (after verifying token)
exports.getUserInfo = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
