// 라우터 모아서 노출해줌
import { Router } from "express";
import fcmRouter from "./fcm.js";
import pointRouter from "./point.js";
import postRouter from "./post.js";
import productRouter from "./product.js";
import quizRouter from "./quiz.js";
import statisticsRouter from "./statistics.js";
import userRouter from "./user.js";

const router = Router();
router.use("/fcm", fcmRouter);
router.use("/point", pointRouter);
router.use("/post", postRouter);
router.use("/product", productRouter);
router.use("/quiz", quizRouter);
router.use("/statistics", statisticsRouter);
router.use("/user", userRouter);

export default router;
