const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/assignment-1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function(){console.log('We are connected to the database.')});
mongoose.set('useFindAndModify', false);
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Password: String
});
const listSchema = new mongoose.Schema({
    name: String,
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:'users'},
    created_at: String,
    updated_at: String
});
const categorySchema = new mongoose.Schema({
    name: String,
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    created_at: String,
    updated_at: String
});
const itemSchema = new mongoose.Schema({
    name: String,
    category_id: {type:mongoose.Schema.Types.ObjectId,ref:'categories'},
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:'users'},
    note: String,
    image: String,
    created_at: String,
    updated_at: String,
    list_id:[{type:mongoose.Schema.Types.ObjectId,ref:'lists'}]
});
const userModel = mongoose.model('user', userSchema);
const listsModel = mongoose.model('lists', listSchema);
const categoriesModel = mongoose.model('categories', categorySchema);
const itemsModel = mongoose.model('items', itemSchema);
app.use(express.json());




//authentification

//users' login
app.post('/user', async (req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email});
        if(!user){
            res.send('Email does not exist. Check again.')
        }else{
            const match = await bcrypt.compare(req.body.Password, user.Password);
            if(!match){
                res.send("Wrong password. Please try again.");
            }else{
            res.send(jwt.sign({id: user._id}, 'anysecret'));
            }
        }
    }catch(error){
        res.send("User not found. Please try again.");
        console.log(error);
    }
});

//sign up for new users
app.post('/user', async (req, res) => {
    try{
        req.body.Password = await bcrypt.hash(req.body.Password, 12);
        const user = await userModel.create(req.body);
        res.json({
            message: "New user registred successfully.",
            user
        })
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});

//get user info
app.get('/user', async (req, res) => {
    try{
        const user= await userModel.find();
        res.json(user);
    }catch(error){
        res.send("Sorry, an error("+error+") occured. Please try again.")
    }
});




//lists

//get user's lists
app.get('/lists', async (req, res) => {
    res.json(await listsModel.find());
});

//create a list
app.post('/lists', async (req, res) => {
    try{
        await listsModel.create(req.body);
        res.send("List created successfully.");    
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});

//update list
app.put('/lists/:id', async (req, res, next) => {
    listsModel.findOneAndUpdate({_id: req.params.id}, {
        $set:{
            name:req.body.name,
            user_id:req.body.user_id,
            created_at:req.body.created_at,
            updated_at:req.body.updated_at
        }
    }).then(result => {
        res.status(200).json({
            updated_product:result
        })
    }).catch(err=>{
        res.status(500).json({error:err})
    })
});

//delete list by id
app.delete('/lists/:id', async (req, res) => {
    try{
        await listsModel.findByIdAndRemove(req.params.id);
        res.send('List deleted successfully.');
    }catch(error){
      res.send("Sorry, an error("+error+") occured, please try again.");
    }
});

//get list's items
app.get('/lists/:id/items', async (req, res) => {
    try{
        const use = await listsModel.findById(req.params.id);
        const x = await itemsModel.find({list: req.params.id});
        res.json({x,use});
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});

//add an item to a list
app.post('/lists/:id/items', async (req, res) => {
    try{
        const use = await itemsModel.findById(req.body.id);
        use.list_id.push(req.params.id);
        await use.save();
        res.json(use);
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});
   
//update an item of a list
//app.put(...

//delete an item of a list
//app.delete('/lists/:id/items', async (req, res) =>{...




//items

//get items
app.get('/items', async (req, res) => {
    res.json(await itemsModel.find());
});

//create item
app.post('/items', async (req, res) => {
    try {
        await itemsModel.create(req.body);
        res.send("Item created successfully.");
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});

// update item
app.put('/items/:id', async (req, res) => {
    await itemsModel.findByIdAndUpdate({_id: req.body.id},{
        $set:{
            name:req.body.name,
            category_id:req.body.category_id,
            user_id:req.body.user_id,
            note:req.body.note,
            image:req.body.image,
            created_at:req.body.created_at,
            updated_at:req.body.updated_at
         }
 
    }).then(result => {
        res.status(200).json({updated_product:result})
    }).catch(err=>{
        res.status(500).json({error:err})
    })
});

// delete item
app.delete('/items/:id', async (req, res) => {
    try{
        await itemsModel.findByIdAndRemove(req.params.id);
        res.send("Item deleted successfully.")
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});




//categories

//get categories by user
app.get('/categories/', async (req, res) => {
    res.json(await categoriesModel.findById(req.params.id));
});

//create category
app.post('/categories', async (req, res) => {
    try {
        await categoriesModel.create(req.body);
        res.send("Category created successfully");
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});

//update category
app.put('/categories/:id', async (req, res, next) => {
    await categoriesModel.findByIdAndUpdate({_id: req.params.id},{
        $set:{
            name:req.body.name,
            user_id:req.body.user_id,
            created_at:req.body.created_at,
            updated_at:req.body.updated_at
        }
    }).then(result => {
    res.status(200).json({updated_product:result})
    }).catch(err => {res.status(500).json({error:err})})
});

//delete category
app.delete('/categories/:id', async (req, res) => {
try{
    await categoriesModel.findByIdAndRemove(req.params.id);
    res.send("Category deleted successfully.");
    }catch(error){
        res.send("Sorry, an error("+error+") occured, please try again.");
    }
});




app.listen(3000, () => {console.log("Connected to the server.");
});