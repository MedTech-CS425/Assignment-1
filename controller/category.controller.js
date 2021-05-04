const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const Category = require("../models/category.model");

module.exports.createCategory = async (req, res, next) => {
    var category = new Category();
    category.id = req.body.id;
    category.name = req.body.name;
    category.created_at = req.body.created_at;
    category.updated_at = req.body.updated_at;
    category.user_id = req.params.id;
    category.save((err, doc) => {
      if (!err) res.send(doc);
      else {
        return next(err);
      }
    });
  };
  module.exports.getCategory  = (req, res, next) => {
    Category .findOne({ user_id: req._id }, (err, category ) => {
      if (category )
        return res
          .status(200)
          .json({ status: true, user: _.pick(category , ["name"]) });
      else
        return res.status(404).json({ status: false, message: "category  not found" });
    });
  };
  module.exports.updateCategory  = (req, res, next) => {
    Category .findOneAndUpdate(
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
  module.exports.deleteCategory  = (req, res, next) => {
    Category .findOneAndDelete({ id: req.params.id }, function(error, success) {
      if (error) {
        res.status(404).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    });
  };
  