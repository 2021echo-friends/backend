import mongoose from "mongoose";

const PointHistorySchema = new mongoose.Schema({
  point_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Point",
    required: true,
  },
  description: { type: String, required: true },
  account_value: { type: Number, required: true },
  eco_value: { type: Number, required: true },
});

export default mongoose.model("PointHistory", PointHistorySchema);
