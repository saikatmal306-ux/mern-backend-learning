// Import mongoose to define the schema and model
const mongoose = require('mongoose')

// Create the Product schema
const productSchema = new mongoose.Schema(
  {
    // Product name stored as text
    name: {
  type: String,
  required: [true, "Product name is required"],
  trim: true,
  minlength: [3, "Name must be at least 3 characters"]
},

price: {
  type: Number,
  required: [true, "Price is required"],
  min: [0, "Price cannot be negative"]
},

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
  },
  {
    // Adds createdAt and updatedAt fields automatically
    timestamps: true,
  }
)

// Create the Product model from the schema
const Product = mongoose.model('Product', productSchema)

// Export the model so it can be used in other files
module.exports = Product
