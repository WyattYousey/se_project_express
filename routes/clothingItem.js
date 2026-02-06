const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

//POST

router.post("/", createItem);

//GET

router.get("/", getItems);

//PUT

router.put("/:itemId", updateItem);

//DELETE

router.delete("/:itemId", deleteItem);

//Likes routes

//PUT

router.put("/:itemId/likes", likeItem);

//DELETE

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
