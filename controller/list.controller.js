const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const List = require("../models/list.model");

module.exports.createList = async (req, res, next) => {
  var list = new List();
  list.id = req.body.id;
  list.name = req.body.name;
  list.created_at = req.body.created_at;
  list.updated_at = req.body.updated_at;
  list.user_id = req.params.id;
  list.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      return next(err);
    }
  });
};
module.exports.getLists = (req, res, next) => {
  List.find({ user_id: req._id }, (err, lists) => {
    if (lists)
      return res
        .status(200)
        .json({ status: true, lists });
    else
      return res.status(404).json({ status: false, message: "list not found" });
  });
};
module.exports.updateList = (req, res, next) => {
  List.findOneAndUpdate(
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
module.exports.deleteList = (req, res, next) => {
  List.findOneAndDelete({ id: req.params.id }, function(error, success) {
    if (error) {
      res.status(404).json({ status: false });
    } else {
      res.status(200).json({ status: true });
    }
  });
};

module.exports.createItemByList = async (req, res, next) => {
  var item = new Item();
  item.name = req.body.name;
  item.category_id = req.params.category_id;
  item.list_id = req.params.list_id;
  item.user_id = req.params.user_id;
  item.note = req.body.note;
  item.image = req.body.image;
  item.created_at = req.body.created_at;
  item.updated_at = req.body.updated_at;
  item.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      return next(err);
    }
  });
};
module.exports.getItemsByList = (req, res, next) => {
  Item.find({ list_id: req.params.list_id }, (err, items) => {
    if (items)
      return res
        .status(200)
        .json({ status: true, items});

    else
      return res.status(404).json({ status: false, message: "item not found" });
  });
};
module.exports.updateItemByList = (req, res, next) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { $set:{note:req.body.note}},
    { $set:{image: req.body.image} },
    function(error, success) {
      if (error) {
        res.status(404).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    }
  );
};
module.exports.deleteItemByList = (req, res, next) => {
  Item.findOneAndDelete({ id: req.params.id }, function(error, success) {
    if (error) {
      res.status(404).json({ status: false });
    } else {
      res.status(200).json({ status: true });
    }
  });
};

