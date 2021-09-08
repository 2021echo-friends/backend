// 출석체크 퀴즈 보기
// 출석체크 보상 받기
import { Router } from "express";
import { correctQuiz } from "../../controller/point.contoller.js";
import { responseHandler } from "../../lib/common.js";
const router = Router();

router.post(
  "/",
  responseHandler(async (req) => {
    return correctQuiz(req.user._id);
  })
);

export default router;
