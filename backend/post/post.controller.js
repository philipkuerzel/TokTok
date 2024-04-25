import { Comment } from "../comment/comment.model.js";
import { User } from "../user/user.model.js";
import { Post } from "./post.model.js";
import bcrypt from "bcrypt";

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

export const getCommentsByPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) res.status(401).json({ message: "Post not found" });
  res.json(post.comments);
};

export const createPost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  const { userId } = req.params;
  const user = await User.findById(userId);
  const newPost = new Post({
    caption,
    imageUrl,
    username: user.username,
  });
  await newPost.save();
  if (!newPost) {
    res.json({ message: "Post not created" });
  }
  res.json(newPost);
};

export const addComment = async (req, res) => {
  const { id, userId } = req.params;
  const { comment } = req.body;
  const user = await User.findById(userId);

  const newComment = new Comment({
    comment,
    username: user.username,
  });

  await newComment.save().then(() => res.json("Comment added"));
  const updatePost = await Post.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: newComment } }
  );
  if (!updatePost) res.status(401).json({ message: "Comment not added" });
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) res.status(401).json({ message: "Post not deleted" });
  res.json(post);
};

export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) res.status(401).json({ message: "Comment not deleted" });
  const updatePost = await Post.findByIdAndUpdate(
    { _id: id },
    { $pull: { comments: commentId } }
  );
  if (!updatePost) res.status(401).json({ message: "Comment not deleted" });
  res.json(updatePost);
};

export const like = async (req, res) => {
  const { postId, userId } = req.params;
  const post = await Post.findById({ _id: postId });
  if (post.likes.includes(userId)) {
    await Post.findByIdAndUpdate({ _id: postId }, { $pull: { likes: userId } });
  } else {
    await Post.findByIdAndUpdate({ _id: postId }, { $push: { likes: userId } });
  }
  res.json(post);
};
