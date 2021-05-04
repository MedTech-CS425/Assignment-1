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
  List.findOne({ user_id: req._id }, (err, list) => {
    if (list)
      return res
        .status(200)
        .json({ status: true, user: _.pick(list, ["name"]) });
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
