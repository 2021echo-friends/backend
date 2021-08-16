import { Router } from "express";
import { errorHandler } from "../lib/common.js";
import clientRouter from "./client/index.js";
import adminRouter from "./admin/index.js";
import authNonRouter from "./auth.non.js";
import {
  DecodeMiddleware,
  TokenMiddleware,
  userTypeRequire,
  AuthenticationMiddleware,
} from "../middleware/user.middleware.js";
import { USER_TYPE } from "../lib/enums.js";
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
