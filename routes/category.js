const Router = require('express').Router;

const verifyToken=require("../middlewares/verifyToken");
const cateogyService=require("../services/category.service");
const router = Router({
    mergeParams: true
  });
router.post("/categories",verifyToken,async(req,res)=>{
  try {
    const result=await cateogyService.addCategory(req.body,req.decodedToken.id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
    
})

router.get("/categories",verifyToken,async(req,res)=>{
  try {
    const result=await cateogyService.getCategory(req.decodedToken.id);
  res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
  
})
router.put("/categories/:categoryId",verifyToken,async(req,res)=>{
  try {
    const result=await cateogyService.changeCategory(req.params.categoryId,req.body);
  res.send(result);
  } catch (error) {
    res.send(error);
  }
  
})

router.delete("/categories/:categoryId",verifyToken,async(req,res)=>{
  try {
    const result=await cateogyService.deleteCategory(req.params.categoryId);
  res.send(result);
  } catch (error) {
    res.send(error);
  }
  
})




module.exports=router;