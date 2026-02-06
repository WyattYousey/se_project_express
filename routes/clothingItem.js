const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");

//POST

router.post("/", createItem);

//GET

router.get("/", getItems);

//PUT

router.put("/:itemId", updateItem);

//DELETE

router.delete("/:itemId", deleteItem);

module.exports = router;
