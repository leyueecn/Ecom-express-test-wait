const bcrypt = require("bcryptjs");

const validatePassword = async (input, hashed) => {
  try {
    const isMatch = await bcrypt.compare(input, hashed);
    return isMatch;
  } catch (err) {
    console.log("validatePassword:", err);
    throw new Error("Error validating password");
  }
};

module.exports = validatePassword;
