// fill req.user
// 카카오 유저(access token 요청으로 email 특정)와 일반 유저(jwt decode 로 토큰 안에 있는 email 특정) 구분

import { StatusCodes } from "http-status-codes";
import { getUser } from "../controller/user.contoller";
import { ErrorFromObject } from "../lib/common";
import jwt, { decode } from "jsonwebtoken";
import { SECRET } from "../config.js";
export const TokenMiddleware = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    next(
      new ErrorFromObject({
        httpCode: StatusCodes.BAD_REQUEST,
        error: "no token",
      })
    );
  }
  next();
};
export const DecodeMiddleware = async (req, res, next) => {
  const decodeToken = await jwt.verify(token, SECRET);
  if (decodeToken.email) {
    req.email = decodeToken.email;
  } else {
    next(
      new ErrorFromObject({
        httpCode: StatusCodes.BAD_REQUEST,
        error: "empty email in token",
      })
    );
  }
  next();
};
export const AuthenticationMiddleware = (req, res, next) => {
  const user = await getUser(req.email);
  if (user) {
    req.user = user;
  } else {
    next(
      new ErrorFromObject({
        httpCode: StatusCodes.BAD_REQUEST,
        error: "no user",
      })
    );
  }
  next();
};
export const userTypeRequire = (userType) => (req, res, next) => {
  if (req.userType !== userType) {
    next(
      new ErrorFromObject({
        httpCode: StatusCodes.BAD_REQUEST,
        error: "wrong user type",
      })
    );
  }

  next();
};
