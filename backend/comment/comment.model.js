import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],

  date: {
    type: Date,
    default: Date.now,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const Comment = mongoose.model("Comment", commentSchema);
