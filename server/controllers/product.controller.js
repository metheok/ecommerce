const Category = require("../models/category");
const Product = require("../models/product");

class ProductContoller {
  fetchAll = async (req, res, next) => {
    try {
      const category = req.query.category;
      const searchQuery = req.query.search;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      let filter = {};
      if (category) {
        const categories = category.split(",").map((each) => each.trim());
        const allCatFilter = {
          $or: [
            ...categories.map((each) => ({
              name: { $regex: each, $options: "i" },
            })),
          ],
        };

        const allCategories = await Category.find(allCatFilter);

        filter.$or = [
          {
            category: { $in: allCategories.map((each) => each._id.toString()) },
          },
        ];
      }
      if (searchQuery) {
        filter.name = { $regex: searchQuery, $options: "i" };
      }
      const totalCount = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);

      const details = await Product.find(filter, {
        __v: false,
      })
        .skip((page - 1) * limit)
        .limit(limit);

      res.json({
        products: details,

        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalCount,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  createProduct = async (req, res, next) => {
    try {
      const { name, category, image, description, price, type } = req.body;
      if (!name || !category) {
        return res.status(400).json({ message: "Arguments not provided" });
      }
      const product = new Product({
        name,
        category,
        image,
        price,
        description,
        type,
      });
      const result = await product.save();
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new ProductContoller();
