import mongoose from "mongoose";

const FCMSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  snippet_message: { type: String, required: true },
  date_create: { type: Date, required: true },
});

export default mongoose.model("FCM", FCMSchema);
