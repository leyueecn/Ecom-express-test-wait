const jwt = require("jsonwebtoken");

const generateToken = (User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const payload = {
    id: User._id,
    username: User.username,
    name: User.name,
    email: User.email,
    picture: User.picture,
    address: User.address,
  };

  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1d",
    });

    // console.log(payload);
  } catch (err) {
    console.log("GenerateToken Error", err);
    res.status(500).json("Internal server error");
  }
};

module.exports = generateToken;
