import { Comment } from "./comment.model.js";
import bcrypt from "bcrypt";

export const getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};


export const getSigleComment = async (req, res)=> {

}