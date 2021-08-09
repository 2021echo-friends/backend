import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Point",
    required: true,
    unique: true,
  },
  url: { type: String, required: true },
});

export default mongoose.model("File", FileSchema);
