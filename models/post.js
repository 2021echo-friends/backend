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
  body: { type: String, required: true },
  date_create: { type: Date, required: true },
});

export default mongoose.model("Post", PostSchema);
