import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String }, // 암호화된 비번을 저장해아햠, 카카오 로그인 경우 이 필드 필요 없음
  user_type: { type: String, enum: ["client", "admin"] }, // admin 이면 회원가입 특정 키 등으로 제한
  date_create: { type: Date, required: true },
});

export default mongoose.model("User", UserSchema);
