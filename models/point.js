import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  account: { type: Number, required: true },
  date_create: { type: Date, required: true },
});

export default mongoose.model("Point", PointSchema);
