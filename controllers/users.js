const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const errorHandling = require("../utils/helpers");

const { NOT_FOUND } = require("../utils/errors");

const JWT_SECRET = require("../utils/lib");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// GET /users:id

const getCurrentUser = (req, res) => {
  const { userId } = req.user;

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
  const { name, avatar, email, password } = req.body;

  User.create({
    name,
    avatar,
    email,
    password,
  })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      errorHandling(err, res);
    });
};

// USER LOGIN

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required",
    });
  }

  User.findUserByCredentials(email.toLowerCase(), password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      errorHandling(err, res);
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login };
