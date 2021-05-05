const Router = require('express').Router;

const verifyToken=require("../middlewares/verifyToken");
const cateogyService=require("../services/category.service");
const router = Router({
    mergeParams: true
  });
router.post("/category",verifyToken,async(req,res)=>{
    const result=await cateogyService.addCategory(req.body,req.decodedToken.id);
    res.send(result);
})


module.exports=router;