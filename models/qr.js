import mongoose from "mongoose";

const QrSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },
  is_used: { type: Boolean, required: true, default:false },
  id: { type: String, required: true },
});

export default mongoose.model("Qr", QrSchema);
