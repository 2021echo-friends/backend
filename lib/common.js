// inputHandler with express-validator
// errorHandler
// responseHandler

import { checkSchema, validationResult } from "express-validator";
import httpStatusCode from "http-status-codes";
export class ErrorFromObject extends Error {
  httpCode;
  data;
  constructor(payload) {
    super(payload.message ? payload.message : "알 수 없는 오류");
    this.httpCode = payload.httpCode
      ? payload.httpCode
      : httpStatusCode.StatusCodes.INTERNAL_SERVER_ERROR;
    this.data = {
      data: payload.data ? payload.data : {},
      error: payload.error ? payload.error : "알 수 없는 오류",
      errorDetails: payload.errorDetails ? payload.errorDetails : [],
      message: payload.message ? payload.message : "알 수 없는 오류",
      success: false,
    };
  }
}

export const errorHandler = (cb) => {
  return (req, res, next) => {
    cb(req, res, next).catch((err) => {
      console.log("i catch err!");
      console.error(err);
      next(err);
    }); // 이거 promise then catch 하는 것 같은데, next로 먼가 에러 핸들링 줬었지.. 좀 치네
    // 이거 왜 .catch 안되지? TS 아니라서? Promise 아니라서?
    // 아마 나는 throw error 안하고 next를 써서?
  };
};
export const responseHandler = (api) => {
  return errorHandler(async (req, res, next) => {
    res.status(httpStatusCode.StatusCodes.OK).json({
      success: true,
      data: await api(req),
      error: "",
      errorDetails: [],
      message: "",
    });
  });
};

export const inputHandler = (schema) => {
  return errorHandler(async (req, res, next) => {
    await checkSchema(schema).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(JSON.stringify(errors));
      throw new ErrorFromObject({
        data: {},
        error: "",
        errorDetails: errors.array(),
        message: "입력된 내용을 다시 확인해 주세요",
        httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
      });
    }
    next();
  });
};
