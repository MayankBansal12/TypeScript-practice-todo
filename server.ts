import express from "express";
const app = express();
import mongoose from "mongoose";
const port = 3000;
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const uri: string | undefined = process.env.ATLAS_URI;

if (uri) {
  mongoose.connect(uri);
} else {
  console.error("ATLAS_URI environment variable is not defined.");
}