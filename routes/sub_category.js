import express from "express";

import {
  createSub_Category,
  deleteSub_Category,
  editSub_Category,
  getSub_Categories,
  getSub_Category,
} from "../controllers/sub_categoryController.js";
import userAuth from "../middlewares/userAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", userAuth, isAdmin, createSub_Category);
router.get("/", getSub_Categories);
router.get("/:id", getSub_Category);
router.patch("/:id", userAuth, isAdmin, editSub_Category);
router.delete("/:id", userAuth, isAdmin, deleteSub_Category);

export default router;
