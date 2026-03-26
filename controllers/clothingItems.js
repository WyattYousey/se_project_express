const ClothingItem = require("../models/clothingItem");
const handleAllControllerErrors = require("../utils/helpers");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// POST items

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      handleAllControllerErrors(err, next)
    });
};

// GET items

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((item) => res.send(item))
    .catch((err) => {
      handleAllControllerErrors(err, next);
    });
};

// DELETE item
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("No item with matching ID found");
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You do not have permission to access this resource')
      }

      return item.deleteOne();
    })
    .then(() => res.send({ message: "Item deleted" }))
    .catch((err) => handleAllControllerErrors(err, next));
};

// LIKE item
const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No item with matching ID found')
    })
    .then((item) => res.send(item))
    .catch((err) => {
      handleAllControllerErrors(err, next)
    });
};

// DISLIKE item

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No item with matching ID found')
    })
    .then((item) => res.send(item))
    .catch((err) => {
      handleAllControllerErrors(err, next);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
