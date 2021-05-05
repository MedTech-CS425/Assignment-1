const Item=require("../models/item.model");

module.exports={
    addItem:async(itemInfo)=>{
        //add item to current user
        return await Item.create(itemInfo);
    }

}
