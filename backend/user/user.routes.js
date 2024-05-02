import express from "express";
import multer from "multer";
import { checkAuth } from "./../middleware/checkAuth.js";
import {
  deleteFollow,
  getCurrentUserDetails,
  getUserDetails,
  getUsers,
  registerUser,
  setFollow,
  updateUserDetails,
} from "./user.controller.js";

const router = express.Router();
const mult = multer();

router.get("/", checkAuth, getUsers);
router.get("/currentUser", checkAuth, getCurrentUserDetails);
router.get("/:id", checkAuth, getUserDetails);
router.post("/register", mult.none(), registerUser);
router.patch("/:id", [mult.single("image"), checkAuth], updateUserDetails);
router.post("/:id/follow", checkAuth, setFollow);
router.post("/:id/unfollow", checkAuth, deleteFollow);

export default router;
