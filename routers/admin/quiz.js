// 퀴즈 만들기
// 퀴즈 수정하기
// 퀴즈 삭제하기
// 오늘의 출석 체크 퀴즈 결정하기 (자동으로 되도록 하는데 수동 변경 가능하도록)
import { Router } from "express";
import { createQuiz, getQuizAdmin } from "../../controller/quiz.controller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();

router.get(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    return getQuizAdmin();
  })
);
router.post(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    const { picture_folder_id, question, answer, selections } = req.body;
    return createQuiz({ picture_folder_id, question, answer, selections });
  })
);

export default router;
