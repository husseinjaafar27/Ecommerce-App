import User from "../models/User.js";
import Shipping from "../models/Shipping.js";

export const createShipping = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    const shipping = await Shipping.create({
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      country: user.country,
      street_address: user.street_address,
      city: user.city,
      region: user.region,
      mobile: user.mobile,
      building_name: user.building_name,
    });

    return res
      .status(200)
      .json({ message: "shipping created successfully!", data: shipping });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getShippings = async (req, res) => {
  try {
    const shippings = await Shipping.findAll();
    if (shippings.length < 1)
      return res.status(404).json({ message: "shippings not found" });
    return res
      .status(200)
      .json({ message: "Fetched shippings successfully.", data: shippings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getShipping = async (req, res) => {
  const { id } = req.params;
  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping)
      return res.status(404).json({ message: "shipping not found" });

    return res
      .status(200)
      .json({ message: "Fetched shipping successfully.", data: shipping });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getByToken = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    const shipping = await Shipping.findAll({ where: { user_id: user.id } });
    if (shipping.length < 0)
      return res.status(404).json({ message: "shippings not found" });

    return res.status(200).json({ message: "Success", data: shipping });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editShipping = async (req, res) => {
  const { id } = req.params;
  try {
    const shipping = await Shipping.findOne({ where: { id } });
    if (!shipping)
      return res.status(404).json({ message: "shipping not found" });

    await Shipping.update(req.body, { where: { id } });
    const updated = await Shipping.findOne({ where: { id } });

    return res
      .status(200)
      .json({ message: "Shipping update successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editGetShippings = async (req, res) => {
  const { id } = req.params;
  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping)
      return res.status(404).json({ message: "shipping not found" });

    await Shipping.update(req.body, { where: { id } });
    const shippings = await Shipping.findAll();
    return res
      .status(200)
      .json({ message: "Shipping updated successfully", data: shippings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteShipping = async (req, res) => {
  const { id } = req.params;
  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping)
      return res.status(404).json({ message: "shipping not found" });

    await Shipping.destroy({ where: { id } });

    return res.status(200).json({ message: "Shipping deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
