import { Op } from "sequelize";
import fs from "fs";

import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";

export const create = async (req, res) => {
  const {
    category_id,
    brand_id,
    user_id,
    name,
    description,
    price,
    quantity,
    available,
  } = req.body;
  if (!name || !description || !price || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const product = await Product.create({
      category_id,
      brand_id,
      user_id: req.user.id,
      name,
      description,
      price,
      quantity,
      available,
      img_url: req.file ? req.file.filename : "default.png",
    });

    return res
      .status(200)
      .json({ message: "Product created successfully!", data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Brand, attributes: ["name"] },
        {
          model: Category,
          attributes: ["name"],
          // include: [{ model: Sub_Category, attributes: ["name"] }],
        },
      ],
    });
    if (products.length < 1) {
      return res.status(404).json({ message: "No products found" });
    }
    return res
      .status(200)
      .json({ message: "All Products List.", data: products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Fetched product successfully.", data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignUrlImage = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.update(
      { img_url: req.file ? req.file.filename : "default.png" },
      { where: { id: id } }
    );

    return res.status(200).json({ message: "Image URL added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.update(req.body, { where: { id: id } });
    if (req.file) {
      await Product.update(
        { img_url: req.file ? req.file.filename : "default.png" },
        { where: { id } }
      );
    }
    return res.status(200).json({ message: "Product update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const img_url = product.img_url;

    if (img_url !== "default.png") {
      try {
        if (fs.existsSync("uploads/product/" + img_url))
          fs.unlinkSync("uploads/product/" + img_url);
      } catch (error) {
        console.log({ message: error.message });
      }
    }
    await Product.destroy({ where: { id } });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSortedProducts = async (req, res) => {
  try {
    const { sort } = req.query;

    let order;
    switch (sort) {
      case "price-asc":
        order = [["price", "ASC"]];
        break;
      case "price-desc":
        order = [["price", "DESC"]];
        break;
      case "quantity_limit":
        order = [["quantity_limit", "DESC"]];
        break;
      case "random":
        //order = sequelize.literal('random()');
        await Product.findAll();
        break;
      default:
        order = [["createdAt", "DESC"]];
        break;
    }

    const products = await Product.findAll({
      order,
    });

    res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const {
      gender,
      price,
      color,
      brand,
      category,
      subcategory,
      page = 1,
      limit = 10,
    } = req.query;

    const whereClause = {};
    const includeClause = [];
    let minPrice, maxPrice;

    if (gender) {
      whereClause.description = {
        ...whereClause.description,
        gender: { [Op.in]: gender.split(",") },
      };
    }

    if (price) {
      [minPrice, maxPrice] = price.split("-").map(parseFloat);
      whereClause.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }

    if (color) {
      whereClause.description = {
        ...whereClause.description,
        color: { [Op.in]: color.split(",") },
      };
    }

    if (brand) {
      const brands = brand.split(",");
      const brandWhereClause = { [Op.in]: brands };

      whereClause["$brand.name$"] = brandWhereClause;

      includeClause.push({
        model: Brand,
        attributes: ["name"],
        where: { name: brandWhereClause },
      });
    }

    if (category) {
      const categories = category.split(",");
      const categoryWhereClause = { [Op.in]: categories };

      whereClause["$category.name$"] = categoryWhereClause;

      includeClause.push({
        model: Category,
        attributes: ["name"],
        where: { name: categoryWhereClause },
      });
    }

    if (subcategory) {
      const subcategories = subcategory.split(",");
      const subcategoryWhereClause = { [Op.in]: subcategories };

      includeClause.push({
        model: Category,
        attributes: [],
        include: [
          {
            model: Sub_Category,
            attributes: ["name"],
            where: { name: subcategoryWhereClause },
          },
        ],
      });
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: includeClause,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    if (count === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({
      message: "success",
      data: rows,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;

    const products = await Product.findAll({
      where: { category_id: category_id },
    });
    return res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
