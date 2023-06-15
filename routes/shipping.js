import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  createShipping,
  deleteShipping,
  editGetShippings,
  editShipping,
  getByToken,
  getShipping,
  getShippings,
} from "../controllers/shippingController.js";

const router = express.Router();

router.post("/", userAuth, createShipping);
router.get("/", getShippings);
router.get("/:id", getShipping);
router.get("/get", userAuth, getByToken);
router.patch("/:id", editShipping);
router.patch("/edit&get/:id", editGetShippings);
router.delete("/:id", deleteShipping);
export default router;
