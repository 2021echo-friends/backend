// product 추가
// product 수정
// product 삭제
import { Router } from "express";
import {
  createProduct,
  readProduct,
} from "../../controller/product.controller.js";
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
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    const { name, price, description, point_value, eco_value } = req.body;
    return createProduct({
      name,
      price,
      description,
      point_value,
      eco_value,
    });
  })
);

export default router;
