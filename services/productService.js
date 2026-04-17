const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");


const createProductService = async (data, userId) => {
  if (!data.name || !data.price) {
    throw new ApiError("Name and price are required", 400);
  }

  const product = new Product({
    name: data.name,
    price: data.price,
    user: userId,
  });

  return await product.save();
};

module.exports = {
  createProductService,
};