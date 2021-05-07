const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    category_id: { type: Number, required: true },
    image: { type: String }
});

module.exports = mongoose.model('item', itemSchema);