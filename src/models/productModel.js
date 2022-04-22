const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    available_Quantity: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("store", ProductSchema);
