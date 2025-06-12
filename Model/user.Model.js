const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  picture: { type: String },
  role: { type: String, default: "user" },
  enabled: { type: Boolean, default: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
