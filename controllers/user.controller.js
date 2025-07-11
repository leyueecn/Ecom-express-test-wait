const User = require("../models/user");
const hashPass = require("../utils/hashPassword");

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({}).exec();
    res.status(200).json(data);
  } catch (err) {
    console.error("getAllUsers Error:", err.message);
    res.status(500).json("Internal server error");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const results = await User.findById(userId);
    if (!results) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("getUserById Error:", err.message);
    res.status(500).json("Internal server error");
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = {};

    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.password) {
      updates.password = await hashPass(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.json({ message: "User updated" });
  } catch (err) {
    console.error("updateUserById Error:", err.message);
    res.status(500).json("Internal server error");
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    console.error("deleteUserById Error:", err.message);
    res.status(500).json("Internal server error");
  }
};