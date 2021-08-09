const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Post", PostSchema);
