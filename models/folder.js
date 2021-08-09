const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  description: { type: String },
});

module.exports = mongoose.model("Folder", FolderSchema);
