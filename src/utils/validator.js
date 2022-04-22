const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const validString = function (value) {
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
const isValidPosition = function (postion) {
  return ["user", "admin"].indexOf(postion) !== -1;
};

module.exports = {
  isValid,
  isValidObjectId,
  isValidRequestBody,
  validString,
  isValidPosition,
};
