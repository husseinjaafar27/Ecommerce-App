import express from "express";

import {
  getFavorites,
  getFavorite,
  getAllSelf,
  addToFavorite,
  removeFromFavorite,
} from "../controllers/favoriteController.js";

import userAuth from "../middlewares/userAuth.js";


const router = express.Router();

router.get("/", userAuth, getFavorites);
router.get("/single/:id", getFavorite);
router.post("/", userAuth, addToFavorite);
router.get("/self", userAuth, getAllSelf);
router.delete("/:id", userAuth, removeFromFavorite);

export default router;
