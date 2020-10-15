const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

/**
 * @route  GET /items
 * @desc   get all the items frm items collection
 * @access public
 */
router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => err.status(404).json(err));
});

/**
 * @route  POST /items
 * @desc   add an item to items collection
 * @access public
 */
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(err);
    });
});

/**
 * @route  DELETE /items/:id
 * @desc   delete item with given id from items collection
 * @access public
 */
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item
        .remove()
        .then((result)=> res.json({ success: true }))
        .catch((err) => res.json({ success: false, error: err }));
    })
    .catch((err) => res.json({ success: false, error: err }));
});

module.exports = router;
