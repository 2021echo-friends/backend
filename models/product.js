import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumnail_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thumnail",
    required: false,
    unique: true,
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  point_value: { type: Number, required: true },
  eco_value: { type: Number, required: true, default: 10 },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Product", ProductSchema);
