const Item=require("../models/item.model");


module.exports={
    addItem:async(itemInfo,user_id)=>{
        //add item to current user
        return await Item.create({...itemInfo,user_id});
    },
    getItems:async(user_id)=>{
        return await Item.find({user_id});
    },
    modifyItem:async(itemId,update)=>{
        return await Item.findByIdAndUpdate(itemId,{...update,updatedAt:Date.now()});
    },
    deleteItem:async(itemId)=>{
        let item=await Item.findById(itemId);
       return item.remove();
    }

}
