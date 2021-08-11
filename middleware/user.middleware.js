// fill req.user
// 카카오 유저(access token 요청으로 email 특정)와 일반 유저(jwt decode 로 토큰 안에 있는 email 특정) 구분

import { StatusCodes } from "http-status-codes";
import { ErrorFromObject } from "../lib/common";

export function AuthenticationMiddleware(req, res, next) {
  next();
}
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
