import express from "express";

import {
  getBillings,
  getBilling,
  createBilling,
  editBilling,
  deleteBilling,
  getByToken,
  editGetBillings,
} from "../controllers/billingController.js";

import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createBilling);
router.get("/", getBillings);
router.get("/get", userAuth, getByToken);
router.get("/:id", getBilling);
router.patch("/:id", userAuth, editBilling);
router.patch("/edit&get/:id", userAuth, editGetBillings);
router.delete("/:id", userAuth, deleteBilling);

export default router;
