const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { DBURL } = require("./config");
const routers = require("./routers");
const {
  handlingError,
  notFoundRouterError,
} = require("./middleware/error.middleware");

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
app.use("/", routers);
app.use(handlingError);
app.all.apply("*", notFoundRouterError);

app.listen(3001, "0.0.0.0", () => {
  console.log("listening on port 3001");
});
