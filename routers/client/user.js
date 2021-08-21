// 내정보
// 내정보 수정
import { Router } from "express";
import { getUserWithOthers } from "../../controller/user.contoller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();
router.get(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    console.log("user info");
    const user_id = req.user._id;
    const others = await getUserWithOthers(user_id);
    return { ...others, user: req.user };
  })
);
export default router;
