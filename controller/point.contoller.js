import Point from "../models/point.js";
import PointHistory from "../models/point_history.js";
import Qr from "../models/qr.js";
import Product from "../models/product.js";
import EcoEffect from "../models/eco_effect.js";
import mongoose from "mongoose";

export const createPointHistoryWithOthers = async (qr_id, user_id) => {
  const session = await mongoose.startSession();
  let qr;
  let product;
  let point;
  let pointHistory;
  let ecoEffect;
  await session.withTransaction(async () => {
    qr = await Qr.findById(qr_id, null, { session });
    product = await Product.findById(qr.product_id, null, { session });
    point = await Point.findOne({ user_id }, null, { session });
    await Qr.findByIdAndUpdate(qr_id, { is_used: true }, { session });
    pointHistory = (
      await PointHistory.create(
        [
          {
            point_id: point._id,
            description:
              product.name +
              "를 구매하여, \n" +
              product.point_value +
              "의 포인트를 획득, \n" +
              "환경에 어느 부분에 " +
              product.eco_value +
              "만큼 좋은 영향을 주었습니다.",
            point_value: product.point_value,
            eco_value: product.eco_value,
          },
        ],
        { session }
      )
    )[0];
    point = await Point.updateOne(
      { _id: point._id },
      { $inc: { account: product.point_value } },
      { new: true, session }
    );
    ecoEffect = await EcoEffect.findOneAndUpdate(
      { user_id },
      {
        $inc: { sum_effect: product.eco_value },
      },
      { new: true, session }
    );
  });
  session.endSession();
  return {
    qr,
    product,
    point,
    pointHistory,
    ecoEffect,
  };
};