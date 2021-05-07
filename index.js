const express = require("express");
const index = express();
const morgan =require ("morgan");
const createError =require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs');
index.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const { json } = require("express");
const { strict } = require("assert");
mongoose.connect('mongodb://localhost:27017/students', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to database');
});

// this function is to fix the findOneAndUpdate error
mongoose.set('useFindAndModify', false); 

// schemas needed in this assignment : 

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  
});
const userModel = mongoose.model('user', userSchema);


const listsSchema = new mongoose.Schema({
   name : String,
  user_id: {type:mongoose.Schema.Types.ObjectId,ref:'users'} ,
  created_at: String,
  updated_at: String
});
const lists = mongoose.model('lists', listsSchema);
const categorySchema = new mongoose.Schema({
   
   name: String,
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
  created_at:String,
  updated_at:String

})
const category = mongoose.model('category',categorySchema);

const itemsSchema = new mongoose.Schema ({
  name: String,
  category_id: {type:mongoose.Schema.Types.ObjectId,ref:'categories'},
  user_id: {type:mongoose.Schema.Types.ObjectId,ref:'users'},
  note: String,
  image: String,
  created_at: String,
  updated_at: String,
  list:[{type:mongoose.Schema.Types.ObjectId,ref:'lists'}]


});
const items = mongoose.model('items',itemsSchema);




// everything about user and authentication

index.post('/login', async (req, res) => {
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



index.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await userModel.create(req.body);
    res.status(200).json({
      message: 'user Added Successfully',
      user
    })
  } catch (error) {
    res.status(500).send('You have Validation Error')
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
  
 

index.get('/getUser',async(req,res)=>{
   try{
     const user= await userModel.find();
     res.status(200).json(user);
   }catch(error){
     res.status(500).send(err)
   }
})



// listss :


//1. get the list of users:
index.get('/getLists',async(req,res)=>{
  res.json(await lists.find());
});
index.get('/getLists/:id', async (req, res) =>{
try {
  const use = await lists.findById(req.params.id);
  res.status(200).json(use);
} catch (error) {
  res.status(500).send(error);
}
});
//2. create lists :
index.post('/createList',async(req,res)=>{
try{
await lists.create(req.body);
res.status(200).send('lists created succesfully')

}catch(error){
    res.status(500).send('problem with server ')
}
})

//3. delete list by id : 
index.delete('/deletelist/:id', async (req, res) =>{
  try {
    await lists.findByIdAndRemove(req.params.id);
    res.status(200).send('Student Deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

//4. update list by id : 
index.put('/updateList/:id',async(req,res,next)=>{

   lists.findOneAndUpdate({_id:req.params.id},
    {
         $set:{
             name:req.body.name,
             user_id:req.body.user_id,
             created_at:req.body.created_at,
             updated_at:req.body.updated_at
         }
    }
    
    ).then(result=>{
        res.status(200).json({
            updated_product:result
        })
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })


})


//5.  get items in a specefic list :  
index.get('/getLists/:id/items', async (req, res) =>{
  try {
    const use = await lists.findById(req.params.id);
    const x = await items.find({ list:req.params.id })
    res.status(200).json({x,use});
    


  } catch (error) {
    res.status(500).json(error);
  }
});

//6. create item in a specefic list : 
index.post('/getLists/:id/items', async (req, res) =>{
  try{
     const use = await items.findById(req.body.id);
     use.list.push(req.params.id);
     await use.save();
     res.status(200).json(use);
  }catch(error){
   res.status(500).send('error try again')
  }
})


//7.  update item in a specefic list : 
 
  index.put('/updateItemOfList/:id/items',async(req,res,next)=>{
    
     await items.findByIdAndUpdate({_id:req.params.id},{
      
      $set:{ 
        items:req.body.items
      }
    }
      
      ).then(result =>{
        res.status(200).json({updated_product:result})
      }).catch(err=>{ res.status(500).json({error:err})
      })

  })






//8.  delete item in a specefic list : 

index.delete('/DeleteItemOfList/:id/items',async(req,res)=>{

  try{
    await items.findOneAndRemove(req.params.id);
    res.status(200).json('item deleted successfuly')
  }catch(err){
    res.status(500).json('problem with ssystem');
  }


})

 

    // items: 
 

//1. get items:
  
index.get('/getItems',async(req,res)=>{
    res.json(await items.find());
   });


//2. create items :

index.post('/createItem',async(req,res)=>{
  try{
        items.create(req.body);
        res.status(200).json("items are created succesfuuly ")
  }catch(error){
res.status(500).json("problem with the system")
  }
})


//3. update items !

index.put('/updateitem/:id',async(req,res,next)=>{
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

//4. delete items : 

index.delete('/deleteitem/:id',async(req,res)=>{
try{
    await items.findByIdAndRemove(req.params.id);
    res.status(200).json("this item is deleted successfuly")
}catch(error){
    res.status(500).json("system erorr")
}

})
 
index.delete('/delete',async(req,res)=>{

  try{
    await items.deleteMany();
    res.status(200).send("this item is deleted successfuly")
}catch(error){
    res.status(500).send("system erorr")
}
})



// categoriess :



//1. get categories : 
index.get('/getCategories',async(req,res)=>{
  res.json( await category.find());
});

//2. create category : 
index.post('/createCategory',async(req,res)=>{
    try{
      await category.create(req.body);
      res.status(200).json("category is created successfuly")
           


   }catch(error){
     res.status(500).json('problem with server')
   }


});


//3. update category by Id : 

index.put('/updateCategory/:id',async(req,res,next)=>{
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


//4. delete category by Id : 

index.delete('/deleteCategory/:id',async(req,res)=>{
  try{
   await category.findByIdAndRemove(req.params.id);
   res.status(200).json("this category deleted is successufuly")

  }catch(error){
    res.status(500).json('there is a problem with your server pls check')
  }


});






index.listen(3000,()=>{
    console.log("ur own server is listening on port 3000");
})


