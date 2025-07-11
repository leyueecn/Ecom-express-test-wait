const express = require("express");
const router = express.Router();
const {
  register,
  login,
  currentUser,
} = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.post("/current-user", auth, currentUser);
// router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
