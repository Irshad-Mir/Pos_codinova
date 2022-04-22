const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const validator = require("../utils/validator");
const jwt = require("jsonwebtoken");
const { Auth } = require("two-step-auth");
const secretkey = "irshad09";

const registerProduct = async function (req, res) {
  try {
    let userId = req.params.userId;
    let requestBody = req.body;
    let decodedId = req.userId;

    if (decodedId == userId) {
      const user = await userModel.findOne({
        _id: userId,
        position: "admin",
        isDeleted: false,
      });

      if (!user) {
        return res.status(404).send({
          status: false,
          message: `You are not authorise to add product or user does not exist`,
        });
      }
    }

    let { Name, Category, description, price, available_Quantity } =
      requestBody;

    let productData = {
      Name,
      Category,
      description,
      price,
      available_Quantity,
    };

    let newProduct = await productModel.create(productData);
    res.status(201).send({
      status: true,
      message: `products registered successfully`,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).send({ status: false, Message: error.message });
  }
};

const updateproduct = async function (req, res) {
  try {
    let productId = req.params.productId;

    let productFound = await productModel.findOne({
      _id: productId,
    });
    if (!productFound) {
      return res
        .status(404)
        .send({ status: false, msg: "There is no product exist with this id" });
    }
    let updateBody = req.body;
    let { Name, Category, description, price, available_Quantity } = updateBody;

    let updateProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      { Name, Category, description, price, available_Quantity },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "Product Updated successfully",
      data: updateProduct,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getProductById = async function (req, res) {
  try {
    let userId = req.params.userId;
    const list = await productModel.find();
    return res
      .status(200)
      .send({ status: true, message: "Register product list", data: list });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { registerProduct, updateproduct, getProductById };
