const router = require("express").Router();
const auth = require("../middleware/middleware");

const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.use("/users", auth, userRouter);
router.use("/items", auth, clothingItem);

module.exports = router;
