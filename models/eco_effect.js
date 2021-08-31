import mongoose from "mongoose";

const EcoEffectSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sum_effect_co2: { type: Number, required: true, default: 0 }, // 나중에 항복별로 에코 점수 세리는게 좋을지도 co2, o3 구한 바다표범 수, 구하 ㄴ 거북이수, 플라스틱 줄인수,..
  sum_effect_o3: { type: Number, required: true, default: 0 }, // 나중에 항복별로 에코 점수 세리는게 좋을지도 co2, o3 구한 바다표범 수, 구하 ㄴ 거북이수, 플라스틱 줄인수,..
  sum_effect_ch4: { type: Number, required: true, default: 0 }, // 나중에 항복별로 에코 점수 세리는게 좋을지도 co2, o3 구한 바다표범 수, 구하 ㄴ 거북이수, 플라스틱 줄인수,..
  date_create: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("EcoEffect", EcoEffectSchema);
