const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: {
        type: integer
    },
    name: {
        type: String
    },
    userId: {
        type: integer
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

module.exports('Category', CategorySchema);