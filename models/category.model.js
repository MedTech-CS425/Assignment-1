const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    name:String,
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
    }
    

})

module.exports=mongoose.model('category',categorySchema)