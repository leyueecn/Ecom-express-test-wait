const express = require("express");
const router = express.Router();
const {
  register,
  login,
  currentUser,
} = require("../controllers/auth.controller");
const { auth, adminOnly } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.post("/current-user", auth, currentUser);
// router.post("/current-admin", auth, adminOnly, currentUser);

module.exports = router;
