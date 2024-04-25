import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
  userGroup: {
    type: String,
    default: "user",
  },
  job: {
    type: String,
  },
  likes: { type: [{ type: Schema.Types.ObjectId, ref: "Post" }] },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  profilePictureUrl: {
    type: String,
    default:
      "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
  },
});

export const User = mongoose.model("User", userSchema);
