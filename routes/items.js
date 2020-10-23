const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require('../middleware/auth');

/**
 * @route  GET /api/items
 * @desc   get all the items frm items collection
 * @access public
 */
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => {
      // console.log('items',items);
      res.json(items);
    })
    .catch((err) => err.status(404).json(err));
});

/**
 * @route  POST /api/items
 * @desc   add an item to items collection
 * @access private
 */
router.post("/",auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(err);
    });
});

/**
 * @route  DELETE /api/items/:id
 * @desc   delete item with given id from items collection
 * @access private
 */
router.delete("/:id",auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item
        .remove()
        .then((result) => res.json({ success: true }))
        .catch((err) => res.json({ success: false, error: err }));
    })
    .catch((err) => res.json({ success: false, error: err }));
});

module.exports = router;
