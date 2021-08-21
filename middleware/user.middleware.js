// fill req.user
// 카카오 유저(access token 요청으로 email 특정)와 일반 유저(jwt decode 로 토큰 안에 있는 email 특정) 구분

import { StatusCodes } from "http-status-codes";
import { getUser } from "../controller/user.contoller.js";
import { ErrorFromObject } from "../lib/common.js";
import jwt, { decode } from "jsonwebtoken";
import { SECRET } from "../config.js";
export const TokenMiddleware = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    throw new ErrorFromObject({
      httpCode: StatusCodes.BAD_REQUEST,
      error: "no token",
    });
  }
  next();
};
export const DecodeMiddleware = async (req, res, next) => {
  const token = req.token;
  const decodeToken = jwt.verify(token, SECRET);
  if (decodeToken.email) {
    req.email = decodeToken.email;
  } else {
    throw new ErrorFromObject({
      httpCode: StatusCodes.BAD_REQUEST,
      error: "empty email in token",
    });
  }
  next();
};
export const AuthenticationMiddleware = async (req, res, next) => {
  const user = await getUser(req.email);
  if (user) {
    req.user = user;
  } else {
    throw new ErrorFromObject({
      httpCode: StatusCodes.BAD_REQUEST,
      error: "no user",
    });
  }
  next();
};
export const userTypeRequire = (userType) => async (req, res, next) => {
  if (req.user.user_type !== userType) {
    throw new ErrorFromObject({
      httpCode: StatusCodes.BAD_REQUEST,
      error: "wrong user type",
    });
  }
  next();
};
