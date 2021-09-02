// 유저 목록 보기
import { Router } from "express";
import { getUsersWithOthers } from "../../controller/user.contoller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();

router.get(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    return getUsersWithOthers();
  })
);

export default router;
