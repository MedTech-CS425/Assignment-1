const List=require("../models/list.model");

module.exports=async (itemId)=>{


return await List.updateMany({items:itemId}, { $pull: { 'items':itemId } })

 
      
  
  
    
}