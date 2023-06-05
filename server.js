import express from "express";
const app = express();
import morgan from "morgan";
app.use(morgan("dev"));
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());
import mongoose from "mongoose";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// routes
import messageRouter from "./routes/messageRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.status(202).json({ message: "Server Running Dear!" });
});

app.use("/api", messageRouter);
app.use("/api", imageRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, async () => {
      console.log(`Server is listening on port:> http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Server Starting Error: ", error);
  }
};

start();
