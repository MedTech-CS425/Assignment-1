const Category=require("../models/category.model")

module.exports={
    addCategory:async(categoryInfo,user_id)=>{
       
       let result= await Category.create({...categoryInfo,user_id});
       return result
    },
    getCategory:async(user_id)=>{
        let result=await Category.find({user_id});
        return result;
    },
    changeCategory:async(categoryId,modifs)=>{
        let result=await Category.findByIdAndUpdate(categoryId,{...modifs,updatedAt:Date.now()});
        return result;
    },
    deleteCategory:async(categoryId)=>{
        let result =await Category.findByIdAndDelete(categoryId);
        return result;
    }
}