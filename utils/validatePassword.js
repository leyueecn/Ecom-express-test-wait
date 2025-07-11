const bcrypt = require("bcryptjs");

const validatePass = async (input, hashed) => {
  if (!hashed || typeof hashed !== "string") {
    throw new Error("Invalid hashed password input.");
  }

  try {
    const isMatch = await bcrypt.compare(input, hashed);
    return isMatch;
  } catch (err) {
    console.error("validatePassword Utility Error:", err.message);
    throw new Error("Error validating password during comparison.");
  }
};

module.exports = validatePass;
