import express from "express";
import multer from "multer";
import { getPosts } from "./post.controller.js";

const router = express.Router();
const mult = multer();

router.get("/", getPosts);

export default router;
