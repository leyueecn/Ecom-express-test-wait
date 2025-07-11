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
// router.get("/getme", auth, User.profile);

// router.put("/user/:id", auth, User.updateUserById);
// router.delete("/user/:id", auth, User.deleteUserById);

router.post("/current-user", currentUser);
// router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
