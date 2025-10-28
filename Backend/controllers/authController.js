const User = require("../models/User");
const jwt = require("jsonwebtoken");

// generating jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// register user
exports.registerUser = async (req, res) => {
  const { fullname, email, password, profileImgurl } = req.body;

  // validation check for missing fields
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
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
exports.loginUser = async (req, res) => {};

// get user info
exports.getUserInfo = async (req, res) => {};
