const ClothingItem = require("../models/clothingItem");
const errorHandling = require("../utils/helpers");
const { NOT_FOUND } = require("../utils/errors");

// POST items

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// GET items

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send(item))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// DELETE item

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// LIKE item

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      errorHandling(err, res);
    });
};

// DISLIKE item

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      errorHandling(err, res);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
