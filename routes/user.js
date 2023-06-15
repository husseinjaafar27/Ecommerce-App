import express from "express";
import {
  deleteUser,
  deleteUserByAmin,
  editUser,
  getAdmins,
  getUsers,
} from "../controllers/userController.js";

import userAuth from "../middlewares/userAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/admin", userAuth, isAdmin, getAdmins);
router.delete("/:id", userAuth, isAdmin, deleteUserByAmin);
router.patch("/edit", userAuth, editUser);
router.delete("/", userAuth, deleteUser);

export default router;
