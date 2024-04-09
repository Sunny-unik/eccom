const { categories } = require("../models");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await categories.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const category = await categories.findAll();
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      const category = await categories.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await categories.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const servicesCount = await Service.count({ where: { categoryId } });
      if (servicesCount === 0) {
        await category.destroy();
        res.status(204).end();
      } else {
        res.status(400).json({ error: "Category is not empty" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
