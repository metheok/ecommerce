const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");

router.get("/", productController.fetchAll);
router.post("/", productController.createProduct);
module.exports = router;
