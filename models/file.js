import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
    unique: true,
  },
  idx: { type: Number, required: true },
  extension: { type: String, required: true },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("File", FileSchema);
