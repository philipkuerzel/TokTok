import express from "express";
import multer from "multer";
import { getComments } from "./comment.controller.js";

const router = express.Router();
const mult = multer();

router.get("/", getComments);

export default router;
