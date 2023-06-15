import Category from "../models/Category.js";
import Sub_Category from "../models/Sub_category.js";

export const createSub_Category = async (req, res) => {
  const { category_id, name, description } = req.body;
  if (!category_id || !name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const category = await Category.findByPk(category_id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const sub_category = await Sub_Category.create({
      category_id,
      name,
      description,
    });

    return res.status(200).json({
      message: "Sub_Category created successfully!",
      data: sub_category,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSub_Categories = async (req, res) => {
  try {
    const sub_categories = await Sub_Category.findAll();
    if (sub_categories.length < 1)
      return res.status(404).json({ message: "No Sub Categories found" });

    return res.status(200).json({
      message: "Fetched sub_categories successfully.",
      data: sub_categories,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSub_Category = async (req, res) => {
  const { id } = req.params;
  try {
    const sub_category = await Sub_Category.findByPk(id);
    if (!sub_category)
      return res.status(404).json({ message: "Sub Category not found" });

    return res.status(200).json({
      message: "Fetched sub_category successfully.",
      data: sub_category,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editSub_Category = async (req, res) => {
  const { id } = req.params;
  try {
    const sub_category = await Sub_Category.findByPk(id);
    if (!sub_category)
      return res.status(404).json({ message: "Sub Category not found" });

    await Sub_Category.update(req.body, { where: { id } });
    const updated = await Sub_Category.findOne({ where: { id } });

    return res.status(200).json({
      message: "Sub_category update successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSub_Category = async (req, res) => {
  const { id } = req.params;
  try {
    const sub_category = await Sub_Category.findByPk(id);
    if (!sub_category)
      return res.status(404).json({ message: "Sub Category not found" });

    await Sub_Category.destroy({ where: { id } });

    return res
      .status(200)
      .json({ message: "Sub_category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
