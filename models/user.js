const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "The email field is required"],
    unique: true,
    lowercase: true, // MongoDb uniqueness checks are case sensitive
    trim: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email: email.toLowerCase() })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.statusCode = 401;
        return Promise.reject(error);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.statusCode = 401;
          return Promise.reject(error);
        }

        return user;
      });
    });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("user", userSchema);
