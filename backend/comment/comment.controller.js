import { Comment } from "./comment.model.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

export const getSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(401).json({ message: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
