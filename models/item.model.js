const mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name can't be empty",
  },
  category_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,

  },
  list_id: {
    type: String,
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
