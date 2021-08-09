const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema({
  account: { type: Number, required: true },
});

module.exports = mongoose.model("Point", PointSchema);
