import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const category = await Category.create({
      name,
      description,
    });

    return res
      .status(200)
      .json({ message: "Category created successfully!", data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.length < 1)
      return res.status(404).json({ message: "No categories found" });

    return res
      .status(200)
      .json({ message: "Fetched categories successfully.", data: categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) return res.status(404).json({ message: "No category found" });

    return res
      .status(200)
      .json({ message: "Fetched category successfully.", data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.update(req.body, { where: { id } });

    return res.status(200).json({ message: "Category update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) return res.status(404).json({ message: "No category found" });

    await Category.destroy({ where: { id } });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
