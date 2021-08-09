import mongoose from "mongoose";

const EcoEffectSchema = new mongoose.Schema({
  sum_effect: { type: Number, required: true }, // 나중에 항복별로 에코 점수 세리는게 좋을지도 co2, o3 구한 바다표범 수, 구하 ㄴ 거북이수, 플라스틱 줄인수,..
  date_create: { type: Date, required: true },
});

export default mongoose.model("EcoEffect", EcoEffectSchema);
