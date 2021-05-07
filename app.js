const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/assignment-1', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to database');
});


mongoose.set('useFindAndModify', false);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  
});
const userModel = mongoose.model('user', userSchema);


const listsSchema = new mongoose.Schema({
   "name" : "string",
  "user_id": {type:mongoose.Schema.Types.ObjectId,ref:'users'} ,
  "created_at": "string",
  "updated_at": "string"
});
const lists = mongoose.model('lists', listsSchema);
const categorySchema = new mongoose.Schema({
   
   name: String,
  "user_id":{type:mongoose.Schema.Types.ObjectId,ref:'users'},
  "created_at":"string",
  "updated_at":"string"

})
const category = mongoose.model('category',categorySchema);

const itemsSchema = new mongoose.Schema ({
  "name": "string",
  "category_id": {type:mongoose.Schema.Types.ObjectId,ref:'categories'},
  "user_id": {type:mongoose.Schema.Types.ObjectId,ref:'users'},
  "note": "string",
  "image": "string",
  "created_at": "string",
  "updated_at": "string",
  "list":[{type:mongoose.Schema.Types.ObjectId,ref:'lists'}]


});
const items = mongoose.model('items',itemsSchema);

app.use(express.json());
app.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
      res.send('Email Does Not Exist')
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match){
      res.send('Incorrect Password')
    }
    res.json({token: jwt.sign({id: user._id}, 'anysecret')})
  } catch (error) {
    res.send(error)
  }
});



app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await userModel.create(req.body);
    res.json({
      message: 'user Added Successfully',
      user
    })
  } catch (error) {
    res.send(' Validation Error')
  }
});



const auth = (req, res, next) => {
    const token = req.get('Authorization');
    console.log(token);
    if(token && jwt.verify(token, 'thisisasecret')){
      next();
    }else {
      res.send('Unauthorized Access')
    }
  };
  
 

app.get('/getUser',async(req,res)=>{
   try{
     const user= await userModel.find();
     res.json(user);
   }catch(error){
     res.send(err)
   }
})



// listss 

app.post('/createList',async(req,res)=>{
try{
await lists.create(req.body);
res.send(' created succesfully')

}catch(error){
    res.send('problem  ')
}
})

app.get('/getLists',async(req,res)=>{
    res.json(await lists.find());
});
app.get('/getLists/:id', async (req, res) =>{
  try {
    const use = await lists.findById(req.params.id);
    res.json(use);
  } catch (error) {
    res.send(error);
  }
});

app.get('/getLists/:id/items', async (req, res) =>{
  try {
    const use = await lists.findById(req.params.id);
    const x = await items.find({ list:req.params.id })
    res.json({x,use});
    


  } catch (error) {
    res.send(error);
  }
});

app.post('/getLists/:id/items', async (req, res) =>{
  try{
     const use = await items.findById(req.body.id);
     use.list.push(req.params.id);
     await use.save();
     res.json(use);

  }catch(error){
   res.send('error')
  }

})








app.delete('/deletelist/:id', async (req, res) =>{
  try {
    await lists.findByIdAndRemove(req.params.id);
    res.send(' Deleted');
  } catch (error) {
    res.send(error);
  }
});



  // itemss 
 

app.post('/createItem',async(req,res)=>{
  try{
        items.create(req.body);
        res.send(" created succesfuuly ")
  }catch(error){
res.send("problem ")
  }
})

app.get('/getItems',async(req,res)=>{
    res.json(await items.find());
});


app.put('/updateitem/:id',async(req,res,next)=>{
  await items.findByIdAndUpdate({_id:req.params.id},
    {
        $set:{
           name:req.body.name,
           category_id:req.body.category_id,
           user_id:req.body.user_id,
           note:req.body.note,
           image:req.body.image,
           created_at:req.body.created_at,
           updated_at:req.body.updated_at
        }

    }).then (result =>{
      res.status(200).json({updated_product:result})
    }).catch(err=>{ res.status(500).json({error:err})

    })

  


})



app.delete('/deleteitem/:id',async(req,res)=>{
try{
    await items.findByIdAndRemove(req.params.id);
    res.send(" deleted successfuly")
}catch(error){
    res.send("erorr")
}

})

// categoriess ::

app.post('/createCategory',async(req,res)=>{
    try{
      await category.create(req.body);
      res.send(" created successfuly")
           


   }catch(error){
     res.send('problem ')
   }


});
app.get('/getCategories',async(req,res)=>{
  res.json( await category.find());
});

app.put('/updateCategory/:id',async(req,res,next)=>{
  await category.findByIdAndUpdate({_id:req.params.id},{
       
    $set:{
       name:req.body.name,
       user_id:req.body.user_id,
       created_at:req.body.created_at,
       updated_at:req.body.updated_at
    }
  }).then(result=>{
res.status(200).json({updated_product:result})

  }).catch(err=>{res.status(500).json({error:err})})


})

app.delete('/deleteCategory/:id',async(req,res)=>{
  try{
   await category.findByIdAndRemove(req.params.id);
   res.send("deleted  successufuly")

  }catch(error){
    res.send('system problem')
  }


});






app.listen(3000,()=>{
    console.log("ur own server is listening on port 3000");
})