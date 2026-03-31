const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const handleAllControllerErrors = require("../utils/helpers");
const { JWT_SECRET } = require("../utils/lib");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");

// GET /users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleAllControllerErrors(err, next));
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => res.send(user))
    .catch((err) => handleAllControllerErrors(err, next));
};

// PATCH /users /me
const editProfile = (req, res, next) => {
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
      throw new NotFoundError("No user with matching ID found");
    })
    .then((newUser) => res.send(newUser))
    .catch((err) => handleAllControllerErrors(err, next));
};

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  let verifiedAvatar;

  if (avatar === "") {
    verifiedAvatar = null;
  } else {
    verifiedAvatar = avatar;
  }

  if (!email || !password) {
    throw new BadRequestError("The email or password are required");
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError(
        "The user with the provided email already exists"
      );
    } else {
      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            name,
            avatar: verifiedAvatar,
            email,
            password: hash,
          })
        )
        .then((newUser) => {
          res.status(201).send({
            name: newUser.name,
            avatar: newUser.avatar,
            _id: newUser._id,
            email: newUser.email,
          });
        })
        .catch((err) => handleAllControllerErrors(err, next));
    }
  });
};

// USER LOGIN
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("The email or password are required");
  }

  return User.findUserByCredentials(email.toLowerCase(), password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => handleAllControllerErrors(err, next));
};

module.exports = { getUsers, getCurrentUser, createUser, login, editProfile };
