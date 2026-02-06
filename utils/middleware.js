const auth = (req, res, next) => {
  req.user = {
    _id: "698622da95c6c10743a713ca",
  };
  next();
};

module.exports = auth;
