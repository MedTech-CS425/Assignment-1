const mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: "id can't be empty",
    unique: true,
  },
  name: {
    type: String,
    required: "name can't be empty",
  },
  category_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    unique: true
  },
  note: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Item", itemSchema);
