const prisma = require("../config/prisma");
const hashPass = require("../utils/hashPassword");
const validatePass = require("../utils/validatePassword");
const genToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { username, name, lname, email, password } = req.body;
  if (!username || !name || !lname || !email || !password) {
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

    const hashedPassword = await hashPass(password);

    await prisma.user.create({
      data: {
        username: username,
        name: name,
        lname: lname,
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    console.log("Register Error", err.message);
    res.status(500).json("Internal server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { username: username },
    });
    if (!existing) {
      return res.status(400).json({ message: "User not found or not Enabled" });
    }

    const isMatch = await validatePass(password, existing.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = genToken(existing);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log("Login Error:", err.message);
    res.status(500).json("Internal server error");
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: req.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.json({ user });
  } catch (err) {
    console.log("currentUser Error", err.message);
    res.status(500).json("Internal server error");
  }
};
