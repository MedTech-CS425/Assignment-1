const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const Item = require("../models/Item.model");
const { handleError, ErrorHandler } = require("../helpers/error");

module.exports.createItem = async (req, res, next) => {
  try{
  var item = new Item();
  item.name = req.body.name;
  item.category_id = req.params.category_id;
  item.list_id = req.body.list_id;
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
}
catch(error){
  if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    next(error)
}
}
module.exports.getItems = (req, res, next) => {
  try{
  Item.find({ user_id: req._id }, (err, items) => {
    if (items)
      return res
        .status(200)
        .json({ status: true, items});

    else
      return res.status(404).json({ status: false, message: "item not found" });
  });
}
catch(error){
  if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    next(error)
}
}
module.exports.updateItem = (req, res, next) => {
  try{
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
}catch(error){
  if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    next(error)
}
}
module.exports.deleteItem = (req, res, next) => {
  try{
  Item.findOneAndDelete({ _id: req.params.id }, function(error, success) {
    if (error) {
      res.status(404).json({ status: false });
    } else {
      res.status(200).json({ status: true });
    }
  });
}
catch(error){
  if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    next(error)
}
}

