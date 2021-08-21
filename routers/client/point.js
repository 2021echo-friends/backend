// 에코포인트 조회
// 에코 포인트 사용 내역, 에코 포인트 수급 내역 조회
import { Router } from "express";
import { createPointHistoryWithOthers } from "../../controller/point.contoller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();

router.post(
  "/point-history",
  inputHandler({}),
  responseHandler(async (req) => {
    // 나중에 QR 만드는 라우터도 만들어야 됨
    const { qr_id } = req.body;
    return createPointHistoryWithOthers(qr_id, req.user._id);
  })
);

export default router;
