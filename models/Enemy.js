import mongoose from "mongoose";

const enemySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  health: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  experienceReward: {
    type: Number,
    required: true,
  },
  reward: {
    type: [String],
    default: [],
  },
});

const Enemy = mongoose.model("Enemy", enemySchema);

export default Enemy;
