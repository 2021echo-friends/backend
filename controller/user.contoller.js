import User from "../models/user.js";
import Point from "../models/point.js";
import EcoEffect from "../models/eco_effect.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import mongoose from "mongoose";
import e from "express";
export const getUser = async (email) => {
  return await User.findOne({ email });
};
export const getToken = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    if (user.password === password) {
      //나중에 암호화 관련 로직 추가
      return jwt.sign({ email }, SECRET, {
        expiresIn: 60 * 60 * 24 * 30, // 30일
      });
    }
  }
  return null;
};
export const createUser = async (
  email,
  password,
  user_type,
  thumbnail_image_url,
  nickname
) => {
  const session = await mongoose.startSession();
  let user;
  let point;
  let eco_effect;
  await session.withTransaction(async () => {
    user = (
      await User.create(
        [{ email, password, user_type, thumbnail_image_url, nickname }],
        {
          session,
        }
      )
    )[0];
    point = (await Point.create([{ user_id: user._id }], { session }))[0];
    eco_effect = (
      await EcoEffect.create([{ user_id: user._id }], { session })
    )[0];
  });
  session.endSession();
  return { user, point, eco_effect };
};
export const getUserWithOthers = async (user_id) => {
  const point = await Point.findOne({ user_id });
  const eco_effect = await EcoEffect.findOne({ user_id });
  // point_history
  return { point, eco_effect };
};
export const getUsersWithOthers = async () => {
  const points = await Point.find({}).populate("user_id");
  const ecoEffects = await EcoEffect.find({}).populate("user_id");

  return { points, ecoEffects };
};
