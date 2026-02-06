const errorHandling = (err, res) => {
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: err.message });
  } else if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  } else {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = errorHandling;
