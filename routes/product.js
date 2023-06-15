import express from "express";
import multer from "multer";

import {
  assignUrlImage,
  create,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/productController.js";

import userAuth from "../middlewares/userAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/create", userAuth, isAdmin, upload.single("img_url"), create);
router.get("/", getProducts);
router.patch(
  "/assignUrlImg/:id",
  userAuth,
  isAdmin,
  upload.single("img_url"),
  assignUrlImage
);
router.patch("/:id", userAuth, isAdmin, upload.single("img_url"), editProduct);
router.delete("/:id", userAuth, isAdmin, deleteProduct);
export default router;
