require("dotenv").config();

const jwt = require("jsonwebtoken");

const genToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error(
      "Configuration Error: JWT_SECRET is not defined in environment variables."
    );
    throw new Error("Server configuration error: JWT secret is missing.");
  }

  try {
    const payload = {
      id: user.id,
      username: user.username,
      // email: user.email,
      // description: user.description,
      role: user.role,
    };

    const options = {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  } catch (err) {
    console.error("Failed to generate JWT:", err.message);
    throw new Error("Token generation failed.");
  }
};

module.exports = genToken;
