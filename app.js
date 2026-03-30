const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middleware/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
require("dotenv").config();

const app = express();

const { PORT = 3001 } = process.env;
const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
