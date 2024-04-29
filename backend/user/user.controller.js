import { uploadImage } from "../utils/uploadImage.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    const user = await User.findOne({ email });
    const passwordHash = await bcrypt.hash(password, 10);
    if (user) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const newUser = await User.create({
        username,
        passwordHash,
        email,
      });
      res.status(201).json(newUser);
    }
  }
};

export const getUserDetails = async (req, res) => {
  console.dir(req.user);
  const { id } = req.params;
  const user = await User.findById(id).lean();
  if (!user) {
   res.status(401).json({ message: "User not found" });
   return
  } 
  res.json([user]);
};

export const getCurrentUserDetails = async (req, res) => {
  console.dir(req.user);
  const { email } = req.user;
  const user = await User.findOne(
    { email },
    { username: true, email: true }
  ).lean();
  res.json(user);
};

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { username, email, bio } = req.body;
  const response = await uploadImage(req.file.buffer);
  const profilePictureUrl = response.secure_url;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { username, email, bio, profilePictureUrl },
    { new: true }
  );
  if (!user) {
    res.status(401).json({ message: "User not found" });
    return
  }
  res.json(user);
};

export const setFollow = async (req, res) => {
  const { id } = req.params;
  const { followId } = req.body;
  const follower = await User.findById(id);
  const updateFollowers = await User.findByIdAndUpdate(
    { _id: followId },
    { $push: { followers: follower.id } }
  );
  const updateFollowing = await User.findByIdAndUpdate(
    { _id: follower.id },
    { $push: { following: followId } }
  );
  if (!updateFollowers || !updateFollowing) {
    res.status(401).json();
    return
  } 
  res.json(updateFollowers, updateFollowing);
};

export const deleteFollow = async (req, res) => {
  const { id } = req.params;
  const { followId } = req.body;
  const follower = await User.findById(id);
  const updateFollowers = await User.findByIdAndUpdate(
    { _id: followId },
    { $pull: { followers: follower.id } }
  );
  const updateFollowing = await User.findByIdAndUpdate(
    { _id: follower.id },
    { $pull: { following: followId } }
  );
  if (!updateFollowers || !updateFollowing) {
    res.status(401).json()
    return
  };
  res.json(updateFollowers, updateFollowing);
};

