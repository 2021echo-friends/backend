import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account: { type: Number, required: true, default: 0 },
  used_account: { type: Number, required: true, default: 0 },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Point", PointSchema);
