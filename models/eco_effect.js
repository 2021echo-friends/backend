import mongoose from "mongoose";

const EcoEffectSchema = new mongoose.Schema({
  sum_effect: { type: Number, required: true }, // 나중에 항복별로 에코 점수 세리는게 좋을지도
});

export default mongoose.model("EcoEffect", EcoEffectSchema);
