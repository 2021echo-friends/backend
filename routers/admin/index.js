import { Router } from "express";
import fcmRouter from "./fcm";
import postRouter from "./post";
import productRouter from "./product";
import quizRouter from "./quiz";
import statisticsRouter from "./statistics";
const router = Router();

router.use("/fcm", fcmRouter);
router.use("/post", postRouter);
router.use("/product", productRouter);
router.use("/quiz", quizRouter);
router.use("/statistics", statisticsRouter);

export default router;
