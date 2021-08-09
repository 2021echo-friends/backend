import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  counts: { type: Number, required: true },
  description: { type: String },
});

export default mongoose.model("Folder", FolderSchema);
