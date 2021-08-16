import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
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
