const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const express = require("express");

// Create a router instance
const router = express.Router();

// Route to get all products
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Export the router
module.exports = router;
