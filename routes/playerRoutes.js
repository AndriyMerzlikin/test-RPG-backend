import { Router } from "express";
import Player from "../models/Player.js";

const router = Router();

// get player
router.get("/", async (req, res) => {
  try {
    const player = await Player.find();
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving player", error: err });
  }
});

// add new player
router.post("/", async (req, res) => {
  const { name, health, attack, defense, inventory, level, experience } =
    req.body;

  try {
    const newPlayer = new Player({
      name,
      health,
      attack,
      defense,
      inventory,
      level,
      experience,
    });

    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (err) {
    res.status(400).json({ message: "Error creating new player", error: err });
  }
});

// change player`s characters
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, health, attack, defense, inventory, level, experience } =
    req.body;

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { name, health, attack, defense, inventory, level, experience },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
