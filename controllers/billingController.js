import Billing from "../models/Billing.js";
import User from "../models/User.js";

export const createBilling = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    const billing = await Billing.create({
      user_id: user.id,
      ...req.body,
    });

    return res
      .status(200)
      .json({ message: "Billing created successfully!", data: billing });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBillings = async (req, res) => {
  try {
    const billings = await Billing.findAll();
    if (billings.length < 1)
      return res.status(404).json({ message: "Billings not found" });

    return res
      .status(200)
      .json({ message: "Fetched billing successfully.", data: billings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBilling = async (req, res) => {
  const { id } = req.params;
  try {
    const billing = await Billing.findByPk(id);
    if (!billing) return res.status(404).json({ message: "Billing not found" });

    return res
      .status(200)
      .json({ message: "Fetched billing successfully.", data: billing });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getByToken = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    const billing = await Billing.findAll({ where: { user_id: user.id } });
    return res.status(200).json({
      message: "Fetched billing by token successfully.",
      data: billing,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editBilling = async (req, res) => {
  const { id } = req.params;
  try {
    const billing = await Billing.findByPk(id);
    if (!billing) return res.status(404).json({ message: "Billing not found" });

    await Billing.update(req.body, { where: { id } });
    const updatedBilling = await Billing.findOne({ where: { id } });

    return res
      .status(200)
      .json({ message: "Billing updated successfully", data: updatedBilling });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editGetBillings = async (req, res) => {
  const { id } = req.params;
  try {
    const billing = await Billing.findByPk(id);
    if (!billing) return res.status(404).json({ message: "Billing not found" });

    await Billing.update(req.body, { where: { id } });
    const updatedBilling = await Billing.findAll();

    return res
      .status(200)
      .json({ message: "Billing updated successfully", data: updatedBilling });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBilling = async (req, res) => {
  const { id } = req.params;
  try {
    const billing = await Billing.findByPk(id);
    if (!billing) return res.status(404).json({ message: "Billing not found" });

    await Billing.destroy({ where: { id } });

    return res.status(200).json({ message: "Billing deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
