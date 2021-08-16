import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account: { type: Number, required: true },
  date_create: { type: Date, required: true },
});

export default mongoose.model("Point", PointSchema);
