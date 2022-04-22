const userModel = require("../models/userModel");
const validator = require("../utils/validator");
const jwt = require("jsonwebtoken");
const { Auth } = require("two-step-auth");
const secretkey = "irshad09";

const signUp = async function (req, res) {
  try {
    const requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide user Details",
      });
    }

    //Extract Body
    let { enterName, enterEmail, password, position } = requestBody;
    console.log(requestBody);

    if (!validator.isValid(enterName)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide your Name",
      });
    }

    if (!validator.isValid(enterEmail)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide your email",
      });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(enterEmail)) {
      return res.status(400).send({
        status: false,
        message: `${enterEmail} is invalid email.Please check.`,
      });
    }

    const isEmailAlreadyUsed = await userModel.findOne({
      enterEmail: enterEmail,
    });
    if (isEmailAlreadyUsed) {
      return res.status(400).send({
        status: false,
        message: `${enterEmail} is already registered.`,
      });
    }

    if (!validator.isValid(password)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide Password",
      });
    }

    if (!(password.length >= 8 && password.length <= 15)) {
      return res.status(400).send({
        status: false,
        message: "Password should be of min 8 and max 15 characters.",
      });
    }
    if (position) {
      if (!validator.isValid(position)) {
        return res.status(400).send({
          status: false,
          message: "Invalid request parameter, please provide position",
        });
      }
    }

    const signedUpdata = await userModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: "Successfully signed Up",
      data: signedUpdata,
    });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
};

const login = async function (req, res) {
  try {
    const requestBody = req.body;

    //Extract Body
    let { email, password } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide user Detaills",
      });
    }

    if (!validator.isValid(email)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide email",
      });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      return res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });
    }

    if (!validator.isValid(password)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameter, please provide Password",
      });
    }

    if (!(password.length >= 8 && password.length <= 15)) {
      return res.status(400).send({
        status: false,
        message: "Password should be of min 8 and max 15 characters.",
      });
    }

    const findUser = await userModel.findOne({ enterEmail: email });

    if (!findUser) {
      return res.status(400).send({
        status: false,
        message: "no such user with this email id found",
      });
    }

    const resSend = await Auth(email, "Mir_tech.");
    res.header("otp", resSend.OTP);
    res.header("user", findUser._id);

    return res
      .status(202)
      .send({ status: true, message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
};

const enterOtp = async function (req, res) {
  try {
    let otpFromHeader = req.header("otp");
    let userIdFromHeader = req.header("user");
    let otpFromBody = req.body.otp;

    if (!otpFromHeader) {
      return res
        .status(400)
        .send({ status: false, message: "OTP not found in request header." });
    }

    if (!userIdFromHeader) {
      return res.status(400).send({
        status: false,
        message: "userId not found in request header.",
      });
    }

    if (isNaN(otpFromBody)) {
      return res
        .status(400)
        .send({ status: false, message: `Please enter valid OTP.` });
    }

    if (otpFromHeader != otpFromBody) {
      return res
        .status(400)
        .send({ status: false, message: `Login Failed! Incorrect OTP.` });
    }

    const token = jwt.sign(
      {
        userId: userIdFromHeader,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      },
      secretkey
    );

    return res
      .status(200)
      .send({ status: true, data: { userId: userIdFromHeader, token: token } });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports = {
  signUp,
  login,
  enterOtp,
};
