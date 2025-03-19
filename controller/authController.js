const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

module.exports.register = async function (req, res,next){
  try {
    const { name, email, password, role } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json(
      { 
        message: "User already exists" 
      });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json(
      {
       message: "User registered successfully" 
      });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports.login = async function (req, res,next){
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.secreatKey, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
