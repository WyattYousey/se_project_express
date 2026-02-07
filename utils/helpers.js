const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("./errors");

const errorHandling = (err, res) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }

  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
};

module.exports = errorHandling;
