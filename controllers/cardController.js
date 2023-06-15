import Card from "../models/Card.js";
import Product from "../models/Product.js";

export const AddToCard = async (req, res) => {
  const { id } = req.user;
  const { products_id } = req.body;
  let array = [];
  let card;

  try {
    if (products_id) {
      for (let i = 0; i < products_id.length; i++) {
        card = await Card.create({
          user_id: id,
          product_id: products_id[i],
          product_quantity: 1,
        });
        array.push(card);
      }
    }

    return res
      .status(200)
      .json({ message: "Card created successfully!", data: array });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCards = async (req, res) => {
  try {
    const cards = await Card.findAll();

    return res
      .status(200)
      .json({ message: "Fetched cards successfully.", data: cards });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);

    return res
      .status(200)
      .json({ message: "Fetched card successfully.", data: card });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyCard = async (req, res) => {
  let { id } = req.user;
  let product_id;
  let products = [];
  let shipping = 3;
  let sub_total = 0;
  let total = 0;
  try {
    const cards = await Card.findAll({
      where: { user_id: id },
    });
    for (let i = 0; i < cards.length; i++) {
      product_id = cards[i].product_id;
      const product = await Product.findByPk(product_id);
      products.push(product);
      cards[i].product = product;
      console.log(product.id);
      sub_total += parseInt(product.price * cards[i].product_quantity);
      total = sub_total + shipping;
    }
    return res.status(200).json({
      message: "success",
      data: cards,
      sub_total: parseInt(sub_total),
      total: total,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editCard = async (req, res) => {
  let { id } = req.user;
  const { cardId } = req.params;
  let product_id;
  let products = [];
  let shipping = 3;
  let sub_total = 0;
  let total = 0;
  try {
    const card = await Card.findByPk(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });
    await Card.update(req.body, {
      where: { id: cardId, user_id: id },
    });

    const cards = await Card.findAll({
      where: { user_id: id },
    });
    if (cards.length < 1)
      return res.status(404).json({ message: "No cards found" });
    for (let i = 0; i < cards.length; i++) {
      product_id = cards[i].dataValues.product_id;
      const product = await Product.findByPk(product_id);
      products.push(product);
      cards[i].dataValues.product = product;
      sub_total += parseInt(product.price * cards[i].product_quantity);
      total = sub_total + shipping;
    }
    return res.status(200).json({
      message: "Card update successfully",
      data: cards,
      sub_total: parseInt(sub_total),
      total: total,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.user;
  const { cardId } = req.params;
  try {
    const card = await Card.findOne({ where: { id: cardId, user_id: id } });
    if (!card) return res.status(404).json({ message: "Card not found" });

    await Card.destroy({ where: { id: cardId, user_id: id } });

    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
