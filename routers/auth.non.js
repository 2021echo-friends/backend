// 회원 가입 (일반, 관리자)
// 로그인 - 토큰 발급
// 홈페이지에 들어갈 통계
// 홈페이지의 행사 안내
import { Router } from "express";
import httpStatusCode from "http-status-codes";
import { getToken } from "../controller/user.contoller.js";
import {
  ErrorFromObject,
  inputHandler,
  responseHandler,
} from "../lib/common.js";

const router = Router();
router.post(
  "/login",
  inputHandler({}),
  responseHandler(async (req) => {
    const { email, password } = req.body;
    const token = await getToken(email, password);

    if (token) {
    } else {
      throw new ErrorFromObject({
        httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
        error: "failed get token",
      });
    }
    return { token };
  })
);

export default router;
