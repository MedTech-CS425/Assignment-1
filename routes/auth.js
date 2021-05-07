const Router = require('express').Router;
const userService=require("../services/user.service");
const verifyToken=require("../middlewares/verifyToken");
const router = Router({
    mergeParams: true
  });
router.post("/login",async (req,res)=>{
  try {
  const result=await userService.login(req.body.email,req.body.password);
  if(result){
  res.status(201).send(result);
  } } catch (error) {
    res.send(error);
  }
  
  
})
router.post("/register",async (req,res)=>{
  try {
    await userService.register({email:req.body.email,password:req.body.password,userName:req.body.userName})
    res.sendStatus(201);
  } catch (error) {
    res.send(error);
  }
  
})
router.get("/getUser",verifyToken,async(req,res)=>{
  console.log(req.decodedToken);
  try {
      const result=await userService.getUser(req.decodedToken.id);
      res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
})
module.exports=router;