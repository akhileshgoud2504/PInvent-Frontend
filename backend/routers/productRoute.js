const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

router.post("/", protect,upload.single("image"), createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect,deleteProduct);

module.exports = router;

