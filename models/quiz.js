const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  pircture_folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  selections: { type: [String], required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);
