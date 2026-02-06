const router = require("express").Router();
const auth = require("../utils/middleware");

const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

module.exports = router;
