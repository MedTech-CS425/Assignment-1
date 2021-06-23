const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const Category = require("../models/category.model");
const { handleError, ErrorHandler } = require("../helpers/error");

module.exports.createCategory = async (req, res, next) => {
  try{
    var category = new Category();
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
  }
  catch(error){
    if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
      next(error)
  }
}
  module.exports.getCategory  = (req, res, next) => {
    try{
    Category .find({ user_id: req._id }, (err, category ) => {
      if (category )
        return res
          .status(200)
          .json({ status: true, category} );
      else
        return res.status(404).json({ status: false, message: "category  not found" });
    });
  }
  catch(error){
    if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
      next(error)
  }
}
  module.exports.updateCategory  = (req, res, next) => {
    try{
    Category .findOneAndUpdate(
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
  }catch(error){
    if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
      next(error)
  }
}

  module.exports.deleteCategory  = (req, res, next) => {
    try{
    Category .findOneAndDelete({ id: req.params.id }, function(error, success) {
      if (error) {
        res.status(404).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    });
  }catch(error){
    if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
      next(error)
  }
}
  