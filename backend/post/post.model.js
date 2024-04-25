import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{type: Schema.Types.ObjectId, ref: "User"}],
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("Post", postSchema);
