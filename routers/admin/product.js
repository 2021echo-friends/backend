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
    const {
      thumnail_id,
      name,
      price,
      description,
      point_value,
      eco_value_co2,
      eco_value_o3,
      eco_value_ch4,
    } = req.body;
    return createProduct({
      thumnail_id,
      name,
      price,
      description,
      point_value,
      eco_value_co2,
      eco_value_o3,
      eco_value_ch4,
    });
  })
);

export default router;
