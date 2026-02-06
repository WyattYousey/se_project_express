const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

//GET users

router.get("/", getUsers);

//GET user by id

router.get("/:userId", getUser);

//POST user

router.post("/", createUser);

module.exports = router;
