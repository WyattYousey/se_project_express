const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/lib");
const UnauthorizedError = require("../errors/UnauthorizedError");

const handleAuthError = () => {
  throw new UnauthorizedError('Authorization required')
};

const extractBearerToken = (header) => header.split(" ")[1];

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  return next();
};
