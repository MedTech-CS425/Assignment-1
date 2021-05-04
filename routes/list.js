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
    console.error(error);
  }
});
router.post('/lists',verifyToken,async(req,res)=>{
    await listService.addList(req.body,req.decodedToken.id);
    res.sendStatus(201);
})
router.put('/lists/:listId',verifyToken,async(req,res)=>{
  await listService.updateList(req.body,req.params.listId);
  res.sendStatus(200);
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
  await listService.getItemsOfList(req.params.listId);//cannot debug until i add items
  res.send("ok")
})
module.exports=router;