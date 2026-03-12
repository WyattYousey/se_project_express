const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const clothingItem = require("./clothingItem");
const users = require("./users");

const { createUser, login } = require("../controllers/users");

router.use("/users", users);
router.use("/items", clothingItem);

router.post("/signup", createUser);
router.post("/signin", login);

router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = router;
