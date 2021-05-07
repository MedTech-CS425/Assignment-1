const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Category"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    note: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
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

module.exports=mongoose.model("Item",ItemSchema);