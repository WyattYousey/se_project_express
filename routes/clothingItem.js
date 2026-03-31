const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middleware/auth");
const { validateId } = require("../middleware/validation");

// POST

router.post("/", auth, createItem);

// GET

router.get("/", getItems);

// DELETE

router.delete("/:itemId", validateId, auth, deleteItem);

// Likes routes

// PUT

router.patch("/:itemId/likes", validateId, auth, likeItem);

// DELETE

router.delete("/:itemId/likes", validateId, auth, dislikeItem);

module.exports = router;
