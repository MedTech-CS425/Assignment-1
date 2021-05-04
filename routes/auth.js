const Router = require('express').Router;
const login=require("../services/user.service");

const router = Router({
    mergeParams: true
  });
router.post("/login",async (req,res)=>{
  const result=await login.login("alaaOmar","123456");
  if(result)
  res.status(201).send(result);
  console.log(result);
  
})
router.post("/register",async (req,res)=>{
  try {
    const result=await login.register({email:req.body.email,password:req.body.password,userName:req.body.userName})
  res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
  
})
module.exports=router;