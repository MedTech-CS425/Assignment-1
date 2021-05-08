const mongoose=require('mongoose');

const listSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    items:[{type:mongoose.Schema.Types.ObjectId,ref:'items'}]
    
})
module.exports=mongoose.model('list',listSchema);