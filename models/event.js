const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  snippet_message: { type: String, required: true },
  // is_fcm: { type: Boolean, required: true },
});

module.exports = mongoose.model("Event", EventSchema);
