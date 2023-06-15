import Brand from "../models/Brand.js";
import fs from "fs";

export const createBrand = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const category = await Brand.create({
      name,
      description,
      img_url: req.file ? req.file.filename : "default.png",
    });

    return res
      .status(200)
      .json({ message: "Category created successfully!", data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    if (brands.length < 1)
      return res.status(404).json({ message: "No brands found" });

    return res
      .status(200)
      .json({ message: "Fetched brands successfully.", data: brands });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    return res
      .status(200)
      .json({ message: "Fetched brand successfully.", data: brand });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    await Brand.update(req.body, { where: { id: id } });
    if (req.file) {
      await Brand.update(
        { img_url: req.file ? req.file.filename : "default.png" },
        { where: { id } }
      );
    }

    return res.status(200).json({ message: "Brand update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findOne({ where: { id } });
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    const img_url = brand.img_url;

    if (img_url !== "default.png") {
      try {
        if (fs.existsSync("uploads/brand/" + img_url))
          fs.unlinkSync("uploads/brand/" + img_url);
      } catch (error) {
        console.log({ message: error.message });
      }
    }
    await Brand.destroy({ where: { id } });

    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
