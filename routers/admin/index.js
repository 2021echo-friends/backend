import { Router } from "express";
import fcmRouter from "./fcm.js";
import postRouter from "./post.js";
import productRouter from "./product.js";
import quizRouter from "./quiz.js";
import statisticsRouter from "./statistics.js";
import qrRouter from "./qr.js";

const router = Router();

router.use("/fcm", fcmRouter);
router.use("/post", postRouter);
router.use("/product", productRouter);
router.use("/quiz", quizRouter);
router.use("/statistics", statisticsRouter);
router.use("/qr", qrRouter);

export default router;
