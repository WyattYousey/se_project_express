const {
  BAD_REQUEST,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("./errors");

const errorHandling = (err, res) => {
  console.log(err);

  // Mongo duplicate email
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR).send({
      message: "User with that email already exists",
    });
  }

  // Invalid data
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({
      message: err.message,
    });
  }

  // Invalid Mongo ID
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({
      message: "Invalid ID format",
    });
  }

  // Authentication errors
  if (err.message === "Incorrect email or password") {
    return res.status(UNAUTHORIZED).send({
      message: err.message,
    });
  }

  // Fallback
  return res.status(err.statusCode || INTERNAL_SERVER_ERROR).send({
    message: err.message || "An error has occurred on the server",
  });
};

module.exports = errorHandling;
