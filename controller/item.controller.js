const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const Item = require("../models/Item.model");

module.exports.createItem = async (req, res, next) => {
  var item = new Item();
  item.id = req.body.id;
  item.name = req.body.name;
  item.category_id = req.params.category_id;
  item.note = req.body.note;
  item.image = req.body.image;
  item.created_at = req.body.created_at;
  item.updated_at = req.body.updated_at;
  item.user_id = req.params.user_id;
  item.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      return next(err);
    }
  });
};
module.exports.getItems = (req, res, next) => {
  Item.findOne({ user_id: req._id }, (err, item) => {
    if (item)
      return res
        .status(200)
        .json({ status: true, user: _.pick(item, ["name"]) });
    else
      return res.status(404).json({ status: false, message: "item not found" });
  });
};
module.exports.updateItem = (req, res, next) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    function(error, success) {
      if (error) {
        res.status(404).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    }
  );
};
module.exports.deleteItem = (req, res, next) => {
  Item.findOneAndDelete({ id: req.params.id }, function(error, success) {
    if (error) {
      res.status(404).json({ status: false });
    } else {
      res.status(200).json({ status: true });
    }
  });
};
