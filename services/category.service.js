const Category=require("../models/category.model")

module.exports={
    addCategory:async(categoryInfo,user_id)=>{
       let result= await Category.create({...categoryInfo,user_id});
       console.debug(result);
       return result
    }
}