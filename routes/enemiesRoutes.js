import { Router } from "express";
import Enemy from "../models/Enemy.js";

const router = Router();

// get all enemies
router.get("/", async (req, res) => {
  try {
    const enemies = await Enemy.find();
    res.json(enemies);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving enemies", error: err });
  }
});

// add new enemy
router.post("/", async (req, res) => {
  const { name, health, attack, defense, experienceReward, reward } = req.body;

  try {
    const newEnemy = new Enemy({
      name,
      health,
      attack,
      defense,
      experienceReward,
      reward,
    });

    const savedEnemy = await newEnemy.save();
    res.status(201).json(savedEnemy);
  } catch (err) {
    res.status(400).json({ message: "Error creating new Enemy", error: err });
  }
});

// change enemy`s characters
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, health, attack, defense, experienceReward, reward } = req.body;

  try {
    const updatedEnemy = await Enemy.findByIdAndUpdate(
      id,
      { name, health, attack, defense, experienceReward, reward },
      { new: true }
    );

    if (!updatedEnemy) {
      return res.status(404).json({ message: "Enemy not found" });
    }

    res.status(200).json(updatedEnemy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete enemy
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEnemy = await Enemy.findByIdAndDelete(id);

    if (!deletedEnemy) {
      return res.status(404).json({ message: "Enemy not found" });
    }

    res
      .status(200)
      .json({ message: "Enemy deleted successfully", enemy: deletedEnemy });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting enemy", error: error.message });
  }
});

export default router;
