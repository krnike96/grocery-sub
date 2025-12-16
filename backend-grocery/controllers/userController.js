import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid user data" });
  }
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  if (users) {
    res.json(users);
  } else {
    res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) return res.status(400).json({ message: "Cannot delete admin" });
    await user.deleteOne();
    res.json({ message: "User removed successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUserByAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.isAdmin !== undefined) user.isAdmin = req.body.isAdmin;
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
