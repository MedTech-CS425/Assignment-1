const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId
    },
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

module.exports = mongoose.model('List', ListSchema);