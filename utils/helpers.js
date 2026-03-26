const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");


const handleAllControllerErrors = (err, next) => {
  if (err.name === "CastError") {
    next(new BadRequestError("The id string is in an invalid format"));
  } else if (err.name === "ValidationError") {
    next(new BadRequestError("Invalid data provided"));
  } else if (err.code === 11000) {
    next(new ConflictError("User already exists"));
  } else {
    next(err);
  }
};

module.exports = handleAllControllerErrors;
