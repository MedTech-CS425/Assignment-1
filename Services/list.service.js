const List=require('../models/list.model');
const itemService=require("./item.service")
async function findList(id){
    return await List.findById(id)
}
module.exports={
    getListByUserId: async(userId)=>{
        const lists=await List.find({user_id:userId})
        return lists
    },
    addList:async(listInfo,user_id)=>{
        return await List.create({...listInfo,user_id}); //spread operator 
    },
    
    updateList:async(modifs,listId)=>{
      await List.findOneAndUpdate({_id:listId},{...modifs,updatedAt:Date.now()});
    },
    deleteList:async(listId)=>{ //TODO add check if owner the same
        await List.findByIdAndDelete(listId);
    },
    getItemsOfList:async(listId)=>{
        const items=await findList(listId);
        return await items.populate('items');
        
    },
    addItemToList:async(listId,itemId)=>{
        const list=await List.findById(listId);
        list.items.push(itemId);
        list.updatedAt=Date.now();
        return await list.save();
    },
    //updates item directly anti-pattern yes but its okay
    updateItemFromList:async(listId,itemId,modifs)=>{
        return await itemService.modidyItem( itemId,modifs);
    }

}