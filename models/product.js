import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumnail_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: false,
  },
  file_counts: { type: Number, default: 1 },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  point_value: { type: Number, required: true },
  eco_value_co2: { type: Number, required: true, default: 10 },
  eco_value_o3: { type: Number, required: true, default: 10 },
  eco_value_ch4: { type: Number, required: true, default: 10 },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Product", ProductSchema);
