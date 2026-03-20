const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middleware/auth");

// POST

router.post("/", auth, createItem);

// GET

router.get("/", getItems);

// DELETE

router.delete("/:itemId", auth, deleteItem);

// Likes routes

// PUT

router.patch("/:itemId/likes", auth, likeItem);

// DELETE

router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
