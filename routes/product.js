const express = require("express");
const router = express.Router();
const {
  create,
  list,
  read,
  update,
  remove,
  listby,
  searchFilters,
  createImages,
  removeImage,
} = require("../controllers/product");
const { auth, adminOnly } = require("../middleware/auth");

router.post("/product", create);
router.get("/products/:count", list);
router.get("/product/:id", read);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);

router.post("/images", auth, adminOnly, createImages);
router.post("/removeimages", auth, adminOnly, removeImage);

module.exports = router;
