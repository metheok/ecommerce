const Category = require("../models/Category");

class CategoryContoller {
  fetchAll = async (req, res, next) => {
    try {
      const totalCount = await Category.countDocuments(filter);

      const details = await Category.find(filter, {
        _id: false,
        __v: false,
      });

      if (details.length === 0) {
        return res.status(404).json({ message: "No categories found." });
      }

      res.json({
        category: details,

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
  createCategory = async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const category = new Category({ name });
      const result = await category.save();
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new CategoryContoller();
