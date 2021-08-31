// product 목록 조회
// product 상세 조회
// product 결제 - 포인트 써서, 카카오톡 메세지 발송(카카오 API 사용)
import { Router } from "express";
import { buyProduct } from "../../controller/point.contoller.js";
import { readProduct } from "../../controller/product.controller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();

router.get(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    return readProduct();
  })
);
router.post(
  "/buy",
  inputHandler({}),
  responseHandler(async (req) => {
    const { product_id } = req.query;
    return buyProduct(product_id, req.user._id);
  })
);

export default router;
