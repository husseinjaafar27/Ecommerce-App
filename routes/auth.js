import express from "express";
import {
  activateUser,
  changePassword,
  forgetPassword,
  logOut,
  login,
  signup,
  validateResetCode,
} from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/signup_user", (req, res, next) => signup(req, res, next, 2));
router.post("/signup_admin", (req, res, next) => signup(req, res, next, 1));
router.patch("/activate", activateUser);
router.post("/login", login);
router.patch("/logout", userAuth, logOut);
router.post("/forgetPassword", forgetPassword);
router.post("/validatePassword", validateResetCode);
router.patch("/changePassword", changePassword);

export default router;
