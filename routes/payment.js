import express from "express";

import userAuth from "../middlewares/userAuth.js";
import { createPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", userAuth, createPayment);

export default router;
