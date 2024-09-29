import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import playerRoutes from "./routes/playerRoutes.js";
import enemiesRoutes from "./routes/enemiesRoutes.js";
import worldMapRoutes from "./routes/worldMapRoutes.js";

const app = express();

const PORT = process.env.PORT || 3333;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/player", playerRoutes);
app.use("/api/enemies", enemiesRoutes);
app.use("/api/worldmap", worldMapRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
