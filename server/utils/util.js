const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const { Config } = require("../../configs/config");

const generateToken = (user) => {
  let options = {};

  options = { expiresIn: "1d" };

  return jwt.sign(user, Config.SECRET_JWT, options);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (a, b) => {
  return bcrypt.compare(a, b);
};

module.exports = {
  hashPassword,
  generateToken,
  comparePassword,
};
