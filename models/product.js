const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  thumnail_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thumnail",
    required: true,
    unique: true,
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
