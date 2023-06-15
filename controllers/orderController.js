import { Op } from "sequelize";

import Order from "../models/Order.js";
import Card from "../models/Card.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ShippingAddress from "../models/Shipping.js";
import BillingAddress from "../models/Billing.js";

export const createOrder = async (req, res) => {
  const { id } = req.user;
  const products = [];
  const shipping = 3;
  let subTotal = 0;
  let neworderNumber = 0;

  try {
    const cards = await Card.findAll({ where: { user_id: id } });
    if (cards.length < 1) {
      return res.status(404).json({ message: "Card not found" });
    }
    const user = await User.findOne({ where: { id: id } });

    const order = await Order.findAll();
    let maxOrderNumber = 0;

    if (order.length === 0) {
      neworderNumber = 1;
    } else {
      for (let i = 0; i < order.length; i++) {
        if (order[i].order_number > maxOrderNumber) {
          maxOrderNumber = order[i].order_number;
        }
      }

      neworderNumber = maxOrderNumber + 1;
    }

    const shippingAddress = await ShippingAddress.findOne({
      where: { user_id: id },
    });
    const billingAddress = await BillingAddress.findOne({
      where: { user_id: id },
    });

    for (const card of cards) {
      const { product_id, product_quantity } = card;
      const product = await Product.findByPk(product_id);
      products.push(product);
      subTotal += parseInt(product.price) * product_quantity;
      await Order.create({
        user_id: id,
        product_id,
        email: user.email,
        date: Date.now(),
        status: "pending",
        shipping_price: shipping,
        sub_total: parseInt(product.price * product_quantity),
        quantity: product_quantity,
        order_number: neworderNumber,
      });
    }

    await Card.destroy({ where: { user_id: id } });

    const orders = await Order.findAll({
      where: { order_number: neworderNumber },
    });

    return res.status(200).json({
      message: "success",
      order_number: neworderNumber,
      data: orders,
      sub_total: parseInt(subTotal),
      total: parseInt(subTotal + shipping),
      billing_address: billingAddress,
      shipping_address: shippingAddress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { status: { [Op.ne]: "complete" } },
    });
    const groupedOrders = orders.reduce((acc, order) => {
      const orderNumber = order.order_number;
      if (acc[orderNumber]) {
        acc[orderNumber].push(order);
      } else {
        acc[orderNumber] = [order];
      }
      return acc;
    }, {});
    const data = [];
    let total = 0;
    for (const orderNumber in groupedOrders) {
      const orders = groupedOrders[orderNumber];
      let sub_total = 0;
      const products = [];
      for (let i = 0; i < orders.length; i++) {
        const product = await Product.findByPk(orders[i].product_id);
        products.push(product);
        orders[i].dataValues.product = product;
        sub_total += parseInt(product.price) * orders[i].quantity;
      }
      total += sub_total + 3;
      data.push({
        order_number: orderNumber,
        orders: orders,
        sub_total: parseInt(sub_total),
        total: sub_total + 3,
      });
    }
    return res.status(200).json({
      message: "success",
      data: data,
      total: total,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Fetched order successfully.", data: order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderByToken = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.findAll({
      where: { user_id: id, status: { [Op.ne]: "complete" } },
    });
    const groupedOrders = orders.reduce((acc, order) => {
      const orderNumber = order.order_number;
      if (acc[orderNumber]) {
        acc[orderNumber].push(order);
      } else {
        acc[orderNumber] = [order];
      }
      return acc;
    }, {});
    const data = [];
    let total = 0;
    for (const orderNumber in groupedOrders) {
      const orders = groupedOrders[orderNumber];
      let sub_total = 0;
      const products = [];
      for (let i = 0; i < orders.length; i++) {
        const product = await Product.findByPk(orders[i].product_id);
        products.push(product);
        orders[i].dataValues.product = product;
        sub_total += parseInt(product.price) * orders[i].quantity;
      }
      total += sub_total + 3;
      data.push({
        order_number: orderNumber,
        orders: orders,
        sub_total: parseInt(sub_total),
        total: sub_total + 3,
      });
    }
    const shippingAddress = await ShippingAddress.findOne({
      where: { user_id: id },
    });
    const billingAddress = await BillingAddress.findOne({
      where: { user_id: id },
    });
    return res.status(200).json({
      message: "success",
      data: data,
      total: total,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await Order.update(req.body, { where: { id } });

    return res.status(200).json({ message: "Order update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await Order.destroy({ where: { id } });

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
