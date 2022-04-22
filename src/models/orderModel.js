const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  invoice_number: {
    type: Number,
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
    trim: true,
  },
  price: {
    type: Number,
  },
  Vat: {
    type: String,
    default: "10%",
  },
  discount: {
    type: String,
    default: "10%",
  },

  productId: {
    type: ObjectId,
    required: true,
    ref: "Product",
    trim: true,
  },

  invoce_Price: {
    type: String,

    trim: true,
  },

  sale_of_date: {
    type: Date,
    default: Date.now,
  },
  available_Quantity: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  cancellable: {
    type: Boolean,
    
  },

  status: {
    type: String,
    
    enum: ["pending", "completed", "cancelled"],
  },
});

module.exports = mongoose.model("sales", orderSchema);
