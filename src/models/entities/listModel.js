const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        type: mongoose.Types.ObjectId,
        ref: 'Item'
    }]
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('List', ListSchema);