import express from "express";
import multer from "multer";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getCommentsByPost,
  getPost,
  getPosts,
} from "./post.controller.js";


const router = express.Router();
const mult = multer();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:id/comments", getCommentsByPost);
router.post("/:userId/", mult.single("image"), createPost);
router.post("/:id/:userId", addComment);
router.delete("/:id", deletePost);
router.delete("/:id/:commentId", deleteComment);

export default router;
