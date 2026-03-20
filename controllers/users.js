const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const errorHandling = require("../utils/helpers");
const { NOT_FOUND, BAD_REQUEST } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/lib");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// GET /users/me

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
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

// PATCH /users /me
const editProfile = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  const updateData = {
    name,
    ...(avatar !== "" && { avatar }), // only include avatar if not empty
  };

  User.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((newUser) => res.send(newUser))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// POST /users

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  let verifiedAvatar;

  if (avatar === "") {
    verifiedAvatar = null;
  } else {
    verifiedAvatar = avatar;
  }

  if (!email || !password) {
    res.status(BAD_REQUEST).send({
      message: "The 'email' and 'password' fields are required",
    });
    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar: verifiedAvatar,
        email,
        password: hash,
      })
    )
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
    return res.status(BAD_REQUEST).send({
      message: "Email and password are required",
    });
  }

  return User.findUserByCredentials(email.toLowerCase(), password)
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

module.exports = { getUsers, getCurrentUser, createUser, login, editProfile };
