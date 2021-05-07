const mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name can't be empty",
  },
  user_id: {
    type: String,
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
module.exports = mongoose.model("List", listSchema);
