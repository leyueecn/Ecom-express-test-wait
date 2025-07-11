const express = require("express");
const router = express.Router();
const {
  create,
  getAllCategory,
  deleteCategoryById,
} = require("../controllers/category.controller");
// const { authCheck, adminCheck } = require("../middlewares/authCheck");

// // @ENDPOINT http://localhost:5001/api/category
// router.post("/category", authCheck, adminCheck, create);
router.get("/category", getAllCategory);
// router.delete("/category/:id", authCheck, adminCheck, remove);

module.exports = router;
