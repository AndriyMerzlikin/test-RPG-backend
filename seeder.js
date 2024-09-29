import mongoose from "mongoose";
import dotenv from "dotenv";

import Player from "./models/Player.js";
import Enemy from "./models/Enemy.js";
import WorldMap from "./models/WorldMap.js";

import { playerData } from "./data/playerData.js";
import { enemiesData } from "./data/enemiesData.js";
import { worldMapData } from "./data/worldMapData.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

const seedDatabase = async () => {
  try {
    await Player.deleteMany();
    await Enemy.deleteMany();
    await WorldMap.deleteMany();

    console.log("Collections cleared!");

    // Додаємо нового гравця
    const player = new Player(playerData);
    await player.save();
    console.log("Player added:", player);

    // Додаємо ворогів
    await Enemy.insertMany(enemiesData);
    console.log("Enemies added!");

    // Додаємо карту світу
    const worldMap = new WorldMap({ map: worldMapData });
    await worldMap.save();
    console.log("World map added!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Закриваємо з'єднання з MongoDB
    mongoose.connection.close();
  }
};

// Викликаємо функцію для додавання даних
seedDatabase();
