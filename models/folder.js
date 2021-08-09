const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  counts: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Folder", FolderSchema);
