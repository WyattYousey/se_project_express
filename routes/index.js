const router = require("express").Router();

const clothingItem = require("./clothingItem");
const users = require("./users");

const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", users);
router.use("/items", clothingItem);

router.post("/signup", createUser);
router.post("/signin", login);

router.use(() => {
  throw new NotFoundError('Page not found')
});

module.exports = router;
