import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  barcode_text: { type: String, required: true, default: "useful code" },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Coupon", CouponSchema);
