import express from "express";
const app = express();
import mongoose from "mongoose";
const port = 3000;
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
import cors from "cors";
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect(process.env.ATLAS_URI);
