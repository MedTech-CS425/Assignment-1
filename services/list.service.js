const List=require('../models/list.model');
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
        items.populate();
        console.log(items);
    }

}