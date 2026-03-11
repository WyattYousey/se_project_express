const router = require("express").Router();

const { getCurrentUser, editProfile } = require("../controllers/users");
const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, editProfile);

module.exports = router;
