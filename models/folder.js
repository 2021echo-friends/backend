import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  counts: { type: Number, required: true },
  description: { type: String },
  date_create: { type: Date, required: true },
});

export default mongoose.model("Folder", FolderSchema);
