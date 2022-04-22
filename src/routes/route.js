const express = require("express");
const router = express.Router();
const mid = require("../middleware/mid.js");

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

//User's APIs -> Sign up, Login and Enter OTP.
router.post("/register", userController.signUp);
router.post("/login", userController.login);
router.post("/enterOtp", userController.enterOtp);

router.post("/product/:userId", mid.userAuth, productController.registerProduct);
router.get("/getproduct/:userId", productController.getProductById);

router.put("/uproduct/:productId", productController.updateproduct);


router.post("/order/:userId", mid.userAuth, orderController.createOrder);
router.put("/uporder/:userId", mid.userAuth, orderController.updateOrder);

module.exports = router;
