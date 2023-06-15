import express from "express";
import multer from "multer";
import {
  createBrand,
  deleteBrand,
  editBrand,
  getBrand,
  getBrands,
} from "../controllers/brandController.js";

import userAuth from "../middlewares/userAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/brand");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post(
  "/create",
  userAuth,
  isAdmin,
  upload.single("img_url"),
  createBrand
);
router.get("/", getBrands);
router.get("/:id", getBrand);
router.patch("/:id", userAuth, isAdmin, upload.single("img_url"), editBrand);
router.delete("/:id", userAuth, isAdmin, deleteBrand);
export default router;
