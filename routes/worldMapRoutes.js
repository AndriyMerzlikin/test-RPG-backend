import { Router } from "express";
import WorldMap from "../models/WorldMap.js"; 

const router = Router();

// GET full map
router.get("/", async (req, res) => {
  try {
    const worldMap = await WorldMap.findOne(); 
    if (!worldMap) {
      return res.status(404).json({ message: "World map not found" });
    }
    res.json(worldMap);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving world map", error: err });
  }
});

// ADD new world map
router.post("/", async (req, res) => {
  const { map } = req.body;

  try {
     await WorldMap.deleteMany(); 
    const newWorldMap = new WorldMap({ map });
    const savedWorldMap = await newWorldMap.save();
    res.status(201).json(savedWorldMap);
  } catch (err) {
    res.status(400).json({ message: "Error creating world map", error: err });
  }
});

// UPDATE world map
router.put("/", async (req, res) => {
  const { map } = req.body;

  try {
    const updatedWorldMap = await WorldMap.findOneAndUpdate(
      {},
      { map },
      { new: true }
    );

    if (!updatedWorldMap) {
      return res.status(404).json({ message: "World map not found" });
    }

    res.status(200).json(updatedWorldMap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE world map
router.delete("/", async (req, res) => {
  try {
    const result = await WorldMap.deleteMany();

    res.status(200).json({ message: "World map deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting world map", error: error.message });
  }
});

export default router;
