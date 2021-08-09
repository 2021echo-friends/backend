import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  point_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Point",
    required: true,
    unique: true,
  },
  eco_effect_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EcoEffect",
    required: true,
    unique: true,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
