import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { DBURL } from "./config.js";
// const routers = require("./routers");
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
// app.use("/", routers);
app.use(handlingError);
app.all("*", notFoundRouterError);

app.listen(3001, "0.0.0.0", () => {
  console.log("listening on port 3001");
});
