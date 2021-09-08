import Point from "../models/point.js";
import PointHistory from "../models/point_history.js";
import Qr from "../models/qr.js";
import Product from "../models/product.js";
import EcoEffect from "../models/eco_effect.js";
import Coupon from "../models/coupon.js";
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
    await Product.findByIdAndUpdate(qr.product_id, { $inc: { cnt: 1 } });
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
              "이산화탄소는 " +
              product.eco_value_co2 +
              "L" +
              "오존은 " +
              product.eco_value_o3 +
              "L" +
              "메탄는 " +
              product.eco_value_ch4 +
              "L" +
              "만큼 좋은 영향을 주었습니다.",
            point_value: product.point_value,
            eco_value_co2: product.eco_value_co2,
            eco_value_o3: product.eco_value_o3,
            eco_value_ch4: product.eco_value_ch4,
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
        $inc: {
          sum_effect_co2: product.eco_value_co2,
          sum_effect_o3: product.eco_value_o3,
          sum_effect_ch4: product.eco_value_ch4,
        },
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

export const buyProduct = async (product_id, user_id) => {
  const session = await mongoose.startSession();
  // point
  // eco_effect
  // coupon
  let pointHistory;
  let coupon;
  await session.withTransaction(async () => {
    const product = await Product.findById(product_id);
    await Product.findByIdAndUpdate(product_id, { $inc: { cnt: 1 } });
    const point = await Point.findOneAndUpdate(
      { user_id },
      {
        $inc: {
          account: -product.point_value,
          used_account: product.point_value,
        },
      },
      { session }
    );
    await EcoEffect.findOneAndUpdate(
      { user_id },
      {
        $inc: {
          sum_effect_co2: product.eco_value_co2,
          sum_effect_o3: product.eco_value_o3,
          sum_effect_ch4: product.eco_value_ch4,
        },
      },
      { session }
    );
    pointHistory = (
      await PointHistory.create(
        [
          {
            point_id: point._id,
            description:
              product.name +
              "를 구매하여, \n" +
              product.point_value +
              "의 포인트를 소비, \n" +
              "이산화탄소는 " +
              product.eco_value_co2 +
              "L" +
              "오존은 " +
              product.eco_value_o3 +
              "L" +
              "메탄는 " +
              product.eco_value_ch4 +
              "L" +
              "만큼 좋은 영향을 주었습니다.",
            point_value: -product.point_value,
            eco_value_co2: product.eco_value_co2,
            eco_value_o3: product.eco_value_o3,
            eco_value_ch4: product.eco_value_ch4,
          },
        ],
        { session }
      )
    )[0];
    coupon = await Coupon.create([{ product_id }], { session });
  });
  await session.endSession();
  return coupon;
};
export const correctQuiz = async (user_id) => {
  const session = await mongoose.startSession();
  let pointHistory;
  await session.withTransaction(async () => {
    const point = await Point.findOneAndUpdate(
      { user_id },
      {
        $inc: {
          account: 1000,
        },
      },
      { session }
    );
    pointHistory = (
      await PointHistory.create(
        [
          {
            point_id: point._id,
            description: "출석퀴즈",
            point_value: 1000,
            eco_value_co2: 0,
            eco_value_o3: 0,
            eco_value_ch4: 0,
          },
        ],
        { session }
      )
    )[0];
  });
  await session.endSession();
  return pointHistory;
};
