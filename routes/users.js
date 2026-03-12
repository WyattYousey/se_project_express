const router = require("express").Router();

const { getCurrentUser, editProfile } = require("../controllers/users");
const auth = require("../middleware/auth");

// GET current user route

router.get("/me", auth, getCurrentUser);

// PATCH edit current user route

router.patch("/me", auth, editProfile);

module.exports = router;
