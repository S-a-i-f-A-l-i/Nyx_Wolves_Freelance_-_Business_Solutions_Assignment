import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(202).json({ message: "Server Running Dear!" });
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, async () => {
      console.log(`Server is listening on port:> http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Server Starting Error: ", error);
  }
};

start();
