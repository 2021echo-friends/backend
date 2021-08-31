import eco_effect from "../models/eco_effect.js";

export const getEcoEffect = async () => {
  return eco_effect.find({});
};
