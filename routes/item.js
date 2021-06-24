const Router = require('express').Router;

const verifyToken=require("../middlewares/verifyToken");
const itemService=require("../services/item.service");
const router = Router({
    mergeParams: true
  });
router.post('/items',verifyToken,async(req,res)=>{
  try {
    await itemService.addItem(req.body,req.decodedToken.id);
    res.send("ok");
  } catch (error) {
    res.send(error)
  }
   
})
router.get('/items',verifyToken,async(req,res)=>{
  try {
    let items=await itemService.getItems(req.decodedToken.id);
  res.send(items);
  } catch (error) {
        res.send(error)

  }
  
})

router.put('/items/:item_id',verifyToken,async(req,res)=>{
  try {
     let item=await itemService.modifyItem(req.params.item_id,req.body);
  res.send(item);
  } catch (error) {
        res.send(error)

  }
 
})
router.delete('/items/:item_id',verifyToken,async(req,res)=>{
  try {
    await itemService.deleteItem(req.params.item_id);
  res.sendStatus(200);
  } catch (error) {
        res.send(error)

  }
  
})

  module.exports=router;
