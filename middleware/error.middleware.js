const handlingError = (err, req, res, next) => {
  let data;
  let httpCode;
  if (err.httpCode) {
    httpCode = err.httpCode;
    data = err.data;
  } else {
    httpCode = 500;
    data = {
      success: false,
      data: {},
      error: `${err.message}${err.stack}` || err.name,
      message: "알수 없는 오류",
    };
  }
  res.status(httpCode).json(data);
};

const notFoundRouterError = (req, res) => {
  res.status(404).json({ message: "invalid url" });
};

module.exports = { handlingError, notFoundRouterError };
