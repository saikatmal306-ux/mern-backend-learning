const Product = require("../models/productModel");

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
    const { name, price } = req.body;

    const product = new Product({
      name,
      price,
      user: req.user._id, // 🔥 important
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true } // return updated data
    );

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.json({
  success: true,
  message: "Product updated successfully",
  data: product
});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.json({
  success: true,
  message: "Product deleted successfully"
});
  } catch (error) {
    res.status(500).send(error.message);
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