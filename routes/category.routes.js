const express = require("express");
const router = express.Router();
const {
  create,
  getAllCategory,
  deleteCategoryById,
} = require("../controllers/category.controller");
const { auth, adminOnly } = require("../middleware/auth");

router.post("/category", auth, adminOnly, create);
router.get("/category", getAllCategory);
router.delete("/category/:id", auth, adminOnly, deleteCategoryById);

module.exports = router;
