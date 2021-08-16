// 내정보
// 내정보 수정
import { Router } from "express";
import { inputHandler, responseHandler } from "../../lib/common";

const router = Router();

router.post(
  "/join",
  inputHandler({}),
  responseHandler(async (req) => {
    const { email, password, user_type } = req.body;
  })
);

export default router;
