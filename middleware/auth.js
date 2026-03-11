const jwt = require("jsonwebtoken");
const errorHandling = require("../utils/helpers");
const { JWT_SECRET } = require("../utils/lib");

const handleAuthError = (res) => {
  const err = new Error("Authorization required");
  err.statusCode = 401;
  return errorHandling(err, res);
};

const extractBearerToken = (header) => header.split(" ")[1];

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
