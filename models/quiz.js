import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  picture_folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  file_counts: { type: number, default: 1 },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  selections: { type: [String], required: true },
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Quiz", QuizSchema);
