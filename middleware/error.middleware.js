import { StatusCodes } from "http-status-codes";

export const handlingError = (err, req, res, next) => {
  let data;
  let httpCode;
  if (err.httpCode) {
    httpCode = err.httpCode;
    data = err.data;
  } else {
    // throw new ErrorFromObject 로 의도되지 않은 에러의 경우
    httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    data = {
      success: false,
      data: {},
      error: `${err.message}${err.stack}` || err.name,
      errorDetails: [],
      message: "알수 없는 오류",
    };
  }
  res.status(httpCode).json(data);
};

export const notFoundRouterError = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "invalid url" });
};
