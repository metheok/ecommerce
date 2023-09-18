// controllers/user.js
const fs = require("fs");
const path = require("path");
const { generateToken } = require("../utils/util");
const { Config } = require("../../configs/config");
const User = require("../models/user");

const fetchUser = async (req, res, next) => {
  try {
    const userToken = generateToken({ _id: req.user._id });

    return res.status(200).json({
      userToken,
      user: {
        email: req.user.email,
        cart: req.user.cart,
        id: req.user._id,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { cart } = req.body;
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { cart },
      { new: true }
    );
    return res.status(200).json({
      user: {
        email: result.email,
        cart: result.cart,
        _id: result._id,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  fetchUser,
  updateUser,
};
