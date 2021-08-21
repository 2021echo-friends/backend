import Product from "../models/product.js";

export const readProduct = async () => {
  // 나중에 pagenation 이나 검색 등 하기
  return await Product.find({});
};

export const createProduct = async ({
  name,
  price,
  description,
  point_value,
  eco_value,
}) => {
  return await Product.create({
    name,
    price,
    description,
    point_value,
    eco_value,
  });
};
