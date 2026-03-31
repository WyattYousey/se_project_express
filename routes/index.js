const router = require("express").Router();

const clothingItem = require("./clothingItem");
const users = require("./users");

const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthenticationLogIn,
} = require("../middleware/validation");

router.use("/users", users);
router.use("/items", clothingItem);

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthenticationLogIn, login);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
