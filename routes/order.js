import express from "express";

import userAuth from "../middlewares/userAuth.js";
import {
  createOrder,
  deleteOrder,
  editOrder,
  getOrder,
  getOrderByToken,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", userAuth, createOrder);
router.get("/", getOrders);
router.get("/single/:id", getOrder);
router.get("/token", userAuth, getOrderByToken);
router.put("/:id", editOrder);
router.delete("/:id", deleteOrder);

export default router;
