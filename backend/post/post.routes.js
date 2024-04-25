import express from "express";
import multer from "multer";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getCommentsByPost,
  getPost,
  getPosts,
  like,
} from "./post.controller.js";

const router = express.Router();
const mult = multer();

router.get("/", checkAuth, getPosts);
router.post("/like/:postId/:userId", checkAuth, like);
router.get("/:id", checkAuth, getPost);
router.get("/:id/comments", checkAuth, getCommentsByPost);
router.post("/:userId/", [checkAuth, mult.single("image")], createPost);
router.post("/:id/:userId", checkAuth, addComment);
router.delete("/:id", checkAuth, deletePost);
router.delete("/:id/:commentId", checkAuth, deleteComment);

export default router;
