const User = require("../models/user");
const errorHandling = require("../utils/helpers");
const { NOT_FOUND } = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// GET /users:id

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// POST /users

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      errorHandling(err, res);
    });
};

module.exports = { getUsers, getUser, createUser };
