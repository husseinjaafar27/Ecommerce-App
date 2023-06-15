import Favorite from "../models/Favorite.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const addToFavorite = async (req, res) => {
  const { id } = req.user;
  const { product_id } = req.body;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const favorite = await Favorite.create({
      user_id: id,
      product_id: product_id,
    });

    return res
      .status(200)
      .json({ message: "Favorite add successfully!", data: favorite });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  const { id } = req.user;
  try {
    const favorites = await Favorite.findAll({ where: { user_id: id } });
    if (favorites.length < 1)
      return res.status(404).json({ message: "No Favorites Found" });

    return res
      .status(200)
      .json({ message: "Fetched favorites successfully.", data: favorites });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Favorite.findByPk(id);
    if (!favorite)
      return res.status(404).json({ message: "Favorite not found" });

    return res
      .status(200)
      .json({ message: "Fetched favorite successfully.", data: favorite });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromFavorite = async (req, res) => {
  const { id } = req.user;
  const product_id = req.params.id;
  let filters = { user_id: id, product_id };

  try {
    const favorite = await Favorite.findOne({ where: filters });
    if (!favorite)
      return res.status(404).json({ message: "Favorite not found" });
    await favorite.destroy();

    return res.status(200).json({ message: "Favorite remove successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllSelf = async (req, res) => {
  try {
    const { id } = req.user;

    const favorites = await Favorite.findAll({
      where: { user_id: id },
      include: [{ model: User }, { model: Product }],
    });
    if (favorites.length < 1)
      return res.status(404).json({ message: "No Favorite found" });

    return res
      .status(200)
      .json({ message: "Fetched favorites successfully.", data: favorites });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
