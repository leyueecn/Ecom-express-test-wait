const express = require("express");
const router = express.Router();
const User = require("../controllers/auth.Controller");
const { auth } = require("../middleware/auth.Middleware");

router.post("/register", User.register);
// router.post("/login", User.login);
// router.get("/getme", auth, User.profile);

// router.put("/user/:id", auth, User.updateUserById);
// router.delete("/user/:id", auth, User.deleteUserById);

module.exports = router;
