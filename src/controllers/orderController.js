const orderModel = require("../models/orderModel.js");
const productModel = require("../models/productModel.js");
const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");
const idAutoIncrement = require("id-auto-increment");

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

/// - API 1 Create Order
const createOrder = async function (req, res) {
  try {
    let userId = req.params.userId;
    let requestBody = req.body;
    let decodedId = req.userId;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, Message: "Invalid user Id" });
    }

    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        Message: "Invalid request params, body can't be empty",
      });
    }

      if (decodedId == userId) {
          
      
      //Extract Params
      let {
        invoice_number,
        userId,

        price,
        Vat,
        discount,
        productId,
        invoce_Price,
        sale_of_date,
        available_Quantity,
      } = requestBody;

        
          

      let productFind = await productModel.find();

      if (!productFind) {
        return res.status(404).send({
          status: false,
          Message: "No order found with provided  ID",
        });
      }
productFind.available_Quantity -= 1;
        //   productFind.save();
            let dbexists = await productModel.find();
    let length = dbexists.length;
          length = length + 1;

          
      let orderDetails = {
        invoice_number: length + 1,
        userId: userId,
        price: price,
        Vat: Vat,
        discount: discount,
        productId: productId,

        invoce_Price: invoce_Price,
        sale_of_date: sale_of_date,
        available_Quantity: length -1,
      };
          

      let order = await orderModel.create(orderDetails);

      return res.status(201).send({
        status: true,
        Message: "Order Placed Successfully",
        data: order,
      });
    } else {
      res.status(401).send({ status: false, Message: "Unauthorized access" });
      } 
       
      }
        
   catch (error) {
    res.status(500).send({ status: false, Message: error.message });
  }
};



// API 2================================================
const updateOrder = async function (req, res) {
  try {
    let userId = req.params.userId;
    let requestBody = req.body;
    let decodedId = req.userId;

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, Message: "Invalid user Id" });
    }

    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        Message: "Invalid request params, body can't be empty",
      });
    }

    if (decodedId == userId) {
      const user = await userModel.findOne({ _id: userId, isDeleted: false });

      if (!user) {
        return res
          .status(404)
          .send({ status: false, message: `user does not exit` });
      }
      //Extract Params
      const { status, orderId } = requestBody;

      if (!orderId) {
        return res
          .status(400)
          .send({ status: false, message: "Order ID is required" });
      }

      if (!isValidObjectId(orderId)) {
        return res
          .status(400)
          .send({ status: false, message: `Order ID Invalid` });
      }

      const order = await orderModel.findOne({ _id: orderId });

      if (!order) {
        return res
          .status(404)
          .send({ status: false, message: `order does not exit` });
      }

      if (!status) {
        return res.status(400).send({
          status: true,
          message: "Order status not changed",
          data: order,
        });
      }

      if (order.cancellable == true) {
        if (order.status == "pending") {
          const updatedOrder = await orderModel.findOneAndUpdate(
            { _id: orderId },
            { status: status },
            { new: true }
          );
          return res.status(200).send({
            status: true,
            message: "Order updated successfully",
            data: updatedOrder,
          });
        }

        if (order.status == "completed" || order.status == "cancelled") {
          if (status) {
            return res.status(400).send({
              status: true,
              message: "Order can't be updated as it is completed or cancelled",
            });
          }
        }
      } else if (order.cancellable == false) {
        res.status(400).send({ Message: "This is not a cancellable order" });
      }
    } else {
      res.status(401).send({ status: false, Message: "Unauthorized access" });
    }
  } catch (error) {
    res.status(500).send({ status: false, Message: error.message });
  }
};
module.exports = { createOrder, updateOrder };
