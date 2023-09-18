const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/", authenticateToken, userController.fetchUser);

router.patch("/", authenticateToken, userController.updateUser);

module.exports = router;
