const Router = require('express').Router;

const verifyToken=require("../middlewares/verifyToken");
const itemService=require("../services/item.service");
const router = Router({
    mergeParams: true
  });
router.post('/items',verifyToken,async(req,res)=>{
   await itemService.addItem({...req.body,user_id:req.decodedToken.id});
    res.send("ok");
})
//need to define category before moving on 

  module.exports=router;