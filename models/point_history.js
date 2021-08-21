import mongoose from "mongoose";

const PointHistorySchema = new mongoose.Schema({
  point_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Point",
    required: true,
  },
  description: { type: String, required: true },
  point_value: { type: Number, required: true },
  eco_value: { type: Number, required: true },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("PointHistory", PointHistorySchema);
