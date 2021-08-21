import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { DBURL } from "./config.js";
import routers from "./routers/index.js";
import {
  handlingError,
  notFoundRouterError,
} from "./middleware/error.middleware.js";

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.error("error connected to MongoDB");
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", routers);
app.all("*", notFoundRouterError); // 순서 유의
app.use(handlingError); // 미들웨어 이기에 자동으로 다음으로 넘김(근데 res을 이미 적어서 notfound router가 뒤에 있으면 이미 보낸 res를 다시 적을 수 없다고 함)

app.listen(3001, "0.0.0.0", () => {
  console.log("listening on port 3001");
});
