const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Config } = require("../../configs/config");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  const secretKey = Config.SECRET_JWT;
  try {
    jwt.verify(token, secretKey, async (err, user) => {
      if (err || !user._id) {
        return res.sendStatus(403);
      }
      const result = await User.findOne({
        _id: user._id,
      });
      if (!result || result._id != user._id) {
        return res.sendStatus(403);
      }
      req.user = {
        _id: result._id.toString(),
        email: result.email,
        cart: result.cart,
        createdAt: result.createdAt,
      };
      next();
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { authenticateToken };
