const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("./errors");

const errorHandling = (err, res) => {
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
};

module.exports = errorHandling;
