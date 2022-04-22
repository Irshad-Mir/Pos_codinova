const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    enterName: {
      type: String,
      required: true,
      trim: true,
    },
    enterEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    position: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("register", userSchema);
