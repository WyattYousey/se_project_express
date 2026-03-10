const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

// SignIn Route

router.post("/signin", login);

// SignUp Route

router.post("signup", createUser);

module.exports = router;
