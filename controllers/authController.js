import User from "../models/User.js";
import genToken from "../config/token.js";
import bcrypt from "bcryptjs";

//signup controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = genToken(user._id);

    //Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //Generate token
    const token = genToken(user._id);

    //Send response
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
