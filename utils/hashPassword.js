const bcrypt = require("bcryptjs");

const hashPass = async (password, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Hashing Error:", err.message);
    throw new Error("Failed to hash password. Please try again.");
  }
};

module.exports = hashPass;
