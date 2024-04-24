import express from "express";
import multer from "multer";
import { getUsers } from "./user.controller.js";

const router = express.Router();
const mult = multer();

router.get("/", getUsers);
router.post("/register");

export default router;
