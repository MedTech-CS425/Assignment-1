const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: {
        type: integer
    },
    name: {
        type: String
    },
    categoryId: {
        type: integer
    },
    userId: {
        type: integer
    },
    note: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

module.exports('Item', ItemSchema);