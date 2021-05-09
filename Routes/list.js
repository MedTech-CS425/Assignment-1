const Router = require('express').Router;

const verifyToken=require("../middlewares/verifyToken");
const listService=require("../services/list.service");
const router = Router({
    mergeParams: true
  });

router.get('/lists',verifyToken,async(req,res)=>{
 
  try {
    const lists=await listService.getListByUserId(req.decodedToken.id);
    res.status(201).send(lists);
  }catch (error) {
       res.send(error)

  }
});
router.post('/lists',verifyToken,async(req,res)=>{
  try {
    await listService.addList(req.body,req.decodedToken.id);
    res.sendStatus(201);
  } catch (error) {
     res.send(error);
  }
    
})
router.put('/lists/:listId',verifyToken,async(req,res)=>{
  try {
     await listService.updateList(req.body,req.params.listId);
  res.sendStatus(200);
  } catch (error) {
     res.send(error);
  }
 
})
router.delete('/lists/:listId',verifyToken,async(req,res)=>{
  try {
     await listService.deleteList(req.params.listId);
     res.sendStatus(200)
  } catch (error) {
      res.status(401);
  }
 
  

})
router.get('/lists/:listId/items',async(req,res)=>{
  try {
     await listService.getItemsOfList(req.params.listId);
  res.send("ok")
  } catch (error) {
     res.send(error);
  }
 
})

router.post('/lists/:listId/items',async(req,res)=>{
  try {
    let result=await listService.addItemToList(req.params.listId,req.body.itemId);
  res.send(result);
  } catch (error) {
     res.send(error);
  }
  
})

router.put('/lists/:listId/items',async(req,res)=>{
  try {
     let {itemId,...rest}=req.body;
  let result= await listService.updateItemFromList(req.params.listId,itemId,rest);
  res.send(result);
  } catch (error) {
    res.send(error);
  }
 
})
module.exports=router;