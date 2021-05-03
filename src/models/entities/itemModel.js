const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId
    },
    user: {
        type: mongoose.Types.ObjectId
    },
    note: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Item', ItemSchema);