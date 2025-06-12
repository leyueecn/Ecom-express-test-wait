const prisma = require("../config/prisma");
const hashPassword = require("../utils/hashPassword");
const validatePassword = require("../utils/validatePassword");
const generateToken = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Username or Email is already exists" });
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    // const newUser = new Data({
    //   username: username,
    //   name: name,
    //   email: email,
    //   password: hashedPassword,
    // });

    // await newUser.save();

    // res.status(201).json({ message: "Register success" });
    // console.log(newUser);
  } catch (err) {
    console.log("Register Error:", err);
    res.status(500).json("Internal server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await Data.findOne({ username });

    if (!existing) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await validatePassword(password, existing.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(existing);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json("Internal server error");
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updates = ({ username, email, password, description } = req.body);

  try {
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    const updatedUser = await Data.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.json({ message: "User updated", user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await Data.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    console.log("updateUserById Error:", err);
    res.status(400).json("Internal server error");
  }
};

exports.profile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id, username, email, description } = req.user;

    res.json({ id, username, email, description });
  } catch (err) {
    console.log("Profile Error:", err);
    res.status(500).json("Internal server error");
  }
};
