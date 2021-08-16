import { Router } from "express";
import { errorHandler } from "../lib/common";
import clientRouter from "./client";
import adminRouter from "./admin";
import authNonRouter from "./auth.non";
import {
  DecodeMiddleware,
  TokenMiddleware,
  userTypeRequire,
  AuthenticationMiddleware,
} from "../middleware/user.middleware";
import { USER_TYPE } from "../lib/enums";
const router = Router();

router.use("/auth-non", authNonRouter);

// 엑세스 토큰 받아서 email 알아내기.
// 인증 미들 웨어, 새로운 카카어 유저의 경우 유저  만들어 주기
router.use(errorHandler(TokenMiddleware));
router.use(errorHandler(DecodeMiddleware));
router.use(errorHandler(AuthenticationMiddleware));

router.use("/client", userTypeRequire(USER_TYPE.CLIENT), clientRouter);
router.use("/admin", userTypeRequire(USER_TYPE.ADMIN), adminRouter);
export default router;
