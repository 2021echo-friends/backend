import Qr from "../models/qr.js";
import Product from "../models/product.js";
import mongoose from "mongoose";
import { ErrorFromObject } from "../lib/common.js";
import { StatusCodes } from "http-status-codes";

export const createQr = async (product_id) => {
  const session = await mongoose.startSession();
  let product;
  let qr;
  await session.withTransaction(async () => {
    product = await Product.findById(product_id);
    if (!product) {
      throw new ErrorFromObject({
        httpCode: StatusCodes.BAD_REQUEST,
        message: "invalid product id",
        error: "no product",
      });
    }
    qr = (await Qr.create([{ product_id }], { session }))[0];
  });
  return { product, qr };
};
