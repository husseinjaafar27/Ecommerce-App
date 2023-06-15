import express from "express";

import {
  AddToCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCard,
} from "../controllers/cardController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/", userAuth, AddToCard);
router.get("/", getCards);
router.get("/:id", getCard);
router.get("/get/my", userAuth, getMyCard);
router.patch("/:cardId", userAuth, editCard);
router.delete("/:cardId", userAuth, deleteCard);

export default router;
