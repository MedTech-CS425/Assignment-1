const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
      },
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
module.exports = mongoose.model("Category", categorySchema);
