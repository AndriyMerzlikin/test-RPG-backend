import mongoose from "mongoose";

const worldMapSchema = new mongoose.Schema({
  map: {
    type: [[String]],
    required: true,
  },
});

const WorldMap = mongoose.model("WorldMap", worldMapSchema);

export default WorldMap;
