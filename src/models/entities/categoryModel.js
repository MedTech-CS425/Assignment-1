const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('Category', CategorySchema);