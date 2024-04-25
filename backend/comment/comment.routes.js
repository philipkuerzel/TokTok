import express from "express";
import multer from "multer";
import { getComments, getSingleComment } from "./comment.controller.js";
import { checkAuth } from "./../middleware/checkAuth.js";

const router = express.Router();
const mult = multer();

router.get("/", checkAuth, getComments);
router.get("/:id", checkAuth, getSingleComment);

export default router;
