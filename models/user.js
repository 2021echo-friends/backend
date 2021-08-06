const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, // object 만들어질때 유니크ㅇ한 object id 보고 넣을지 정하기
  point_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Point",
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
