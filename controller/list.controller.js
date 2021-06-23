const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const List = require("../models/list.model");
const Item = require("../models/Item.model");
const { handleError, ErrorHandler } = require("../helpers/error");

module.exports.createList = async (req, res, next) => {
  try {
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
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};
module.exports.getLists = (req, res, next) => {
  try {
    List.find((err, lists) => {
      if (lists) return res.status(200).json({ status: true, lists });
      else
        return res
          .status(404)
          .json({ status: false, message: "list not found" });
    });
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};
module.exports.updateList = (req, res, next) => {
  try {
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
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};
module.exports.deleteList = (req, res, next) => {
  try {
    List.findOneAndDelete({ id: req.params.id }, function(error, success) {
      if (error) {
        res.status(404).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    });
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};

module.exports.createItemByList = async (req, res, next) => {
  try {
    Item.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { list_id: req.params.list_id } },
      (err, items) => {
        if (items) return res.status(200).json({ status: true, items });
        else
          return res
            .status(404)
            .json({ status: false, message: "item not found" });
      }
    );
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};

module.exports.getItemsByList = (req, res, next) => {
  try {
    Item.find({ list_id: req.params.list_id }, (err, items) => {
      if (items) return res.status(200).json({ status: true, items });
      else
        return res
          .status(404)
          .json({ status: false, message: "item not found" });
    });
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};

module.exports.updateItemByList = (req, res, next) => {
  try {
    Item.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { $set: { note: req.body.note } },
      { $set: { image: req.body.image } },
      function(error, success) {
        if (error) {
          res.status(404).json({ status: false });
        } else {
          res.status(200).json({ status: true });
        }
      }
    );
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};

module.exports.deleteItemByList = (req, res, next) => {
  try {
    Item.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { list_id: null } },
      (err, items) => {
        if (items)
          return res
            .status(200)
            .json({ status: true, message: "item deleted from the list" });
        else
          return res
            .status(404)
            .json({ status: false, message: "item not found" });
      }
    );
  } catch (error) {
    if (error.status === 500)
      error = new ErrorHandler(500, "Internal server error");
    next(error);
  }
};
