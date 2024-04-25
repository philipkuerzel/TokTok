import { Comment } from "./comment.model.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

export const getSingleComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) res.status(401).json({ message: "Comment not found" });
  res.json(comment);
};