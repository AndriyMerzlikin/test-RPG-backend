import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Hero",
  },
  health: {
    type: Number,
    required: true,
    default: 100,
  },
  attack: {
    type: Number,
    required: true,
    default: 10,
  },
  defense: {
    type: Number,
    required: true,
    default: 5,
  },
  inventory: {
    type: [String],
    default: [],
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
