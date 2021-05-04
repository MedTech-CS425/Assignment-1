const mongoose = require("mongoose");
const Item = require("/Item.model");
var listSchema = new mongoose.Schema([
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: "name can't be empty",
    },
    items: {
      type: [Item],
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
  },
]);
module.exports = mongoose.model("ListArray", listArraySchema);
