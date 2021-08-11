// 라우터 모아서 노출해줌
import { Router } from "express";
import fcmRouter from "./fcm";
import pointRouter from "./point";
import postRouter from "./post";
import productRouter from "./product";
import quizRouter from "./quiz";
import statisticsRouter from "./statistics";
import userRouter from "./user";

const router = Router();
router.use("/fcm", fcmRouter);
router.use("/point", pointRouter);
router.use("/post", postRouter);
router.use("/product", productRouter);
router.use("/quiz", quizRouter);
router.use("/statistics", statisticsRouter);
router.use("/user", userRouter);

export default router;
