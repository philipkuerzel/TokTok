import { Post } from "./post.model.js";
import bcrypt from "bcrypt";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};
