import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";

import userAuth from "../middlewares/userAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/create", userAuth, isAdmin, createCategory);

router.get("/", getCategories);
router.get("/:id", getCategory);
router.patch("/:id", userAuth, isAdmin, editCategory);
router.delete("/:id", userAuth, isAdmin, deleteCategory);
export default router;
