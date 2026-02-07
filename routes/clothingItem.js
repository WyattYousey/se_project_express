const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// POST

router.post("/", createItem);

// GET

router.get("/", getItems);

// DELETE

router.delete("/:itemId", deleteItem);

// Likes routes

// PUT

router.put("/:itemId/likes", likeItem);

// DELETE

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
