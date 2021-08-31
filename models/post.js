import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  attachment_folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  body_folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  body_file_counts: { type: Number, default: 1 },
  attachment_file_counts: { type: Number, default: 1 },
  body: { type: String, required: true },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
