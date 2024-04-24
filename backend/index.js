import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
process.loadEnvFile(".env");

await mongoose.connect(process.env.MONGODB_URL);

cloudinary.config({
  cloud_name: "du97czlhz",
  api_key: "452675419245823",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
