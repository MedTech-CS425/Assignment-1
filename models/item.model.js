const mongoose=require('mongoose');

const itemSchema=mongoose.Schema({

    name:String,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'

    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorys'
    },
    note:String
        

    ,
    image:String,

    createdAt:{
        type:Date,
        default:Date.now()

    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});
itemSchema.post('remove',itemId=>{
 let cleanUp=require("../middlewares/cleanUp");
 cleanUp(itemId._id);
 //still doesnt work
})
module.exports=mongoose.model('item',itemSchema)