import { User } from "./user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
