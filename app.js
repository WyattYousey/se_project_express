const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect(
    "mongodb+srv://youseywyatt1_db_user:Cdv6opZg42V9BZWA@cluster0.jv1kvrz.mongodb.net/?appName=Cluster0/wtwr_db"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
