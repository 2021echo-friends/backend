// 유저 목록 보기
import { Router } from "express";
import {
  deleteUser,
  getUsersWithOthers,
} from "../../controller/user.contoller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();

router.get(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    return getUsersWithOthers();
  })
);
router.delete(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    const { user_id } = req.query;
    return deleteUser(user_id);
  })
);
export default router;
