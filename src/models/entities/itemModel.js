const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    note: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Item', ItemSchema);