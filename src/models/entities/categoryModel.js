const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Category', CategorySchema);