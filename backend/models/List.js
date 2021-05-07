const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    item_id:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Item"
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports= mongoose.model("List",ListSchema);