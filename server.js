import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// routes
import messageRouter from "./routes/messageRoutes.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(202).json({ message: "Server Running Dear!" });
});

app.use("/api", messageRouter);

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
