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
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

module.exports = mongoose.model('Item', ItemSchema);