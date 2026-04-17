const Product = require("../models/productModel");
const { createProductService } = require("../services/productService");

// Controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id })
  .populate("user", "name email");
    res.json({
  success: true,
  message: "Products fetched successfully",
  data: products
});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller to get a product by its ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
  success: true,
  message: "Product fetched successfully",
  data: product
});
  } catch (error) {
    next(error);
  }
};



const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // ❗ Check product exists
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // 🔥 AUTHORIZATION CHECK
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this product");
    }

    // 🔹 Update fields
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    await product.save();

    res.json({
      success: true,
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // ❗ Check product exists
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // 🔥 AUTHORIZATION CHECK
    if (product.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this product");
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Export functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};