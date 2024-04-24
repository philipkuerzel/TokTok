import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

process.loadEnvFile(".env");

await mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(morgan)
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
