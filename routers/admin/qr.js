// 유니크한 qr 발급
import { Router } from "express";
import { createQr } from "../../controller/qr.controller.js";
import { inputHandler, responseHandler } from "../../lib/common.js";

const router = Router();

router.post(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    // product id에 따라 unique한 qr 발급
    const { product_id } = req.body;
    return await createQr(product_id);
  })
);

export default router;
