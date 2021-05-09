const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Assignment1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log('DB connected!');
});
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Password: String
});
const listSchema = new mongoose.Schema({

    name: String,
    user_id: userSchema,
    created_at: String,
    updated_at: String

   
});
const categorySchema = new mongoose.Schema({

    name: String,
    user_id: userSchema,
    created_at: String,
    updated_at: String
});
const itemSchema = new mongoose.Schema({
    name: String,
    category_id: categorySchema,
    note: String,
    Password: String,
    image: String,
    created_at: String,
    updated_at: String
});
const user = mongoose.model('user', userSchema);
const list = mongoose.model('list', listSchema);
const category = mongoose.model('category', categorySchema);
const item = mongoose.model('item', itemSchema);

app.use(express.json());

//user 
// register user

app.post('/register', async (req, res) => {

    try {

        req.body.Password = await bcrypt.hash(req.body.Password, 12);
        await user.create(req.body);
        res.send("Success");
    } catch (error) {
        res.send("Error");
        console.log(error);
    }
});

 //user login
app.post('/login', async (req, res) => {

    try {
        const User = await user.findOne({ email: req.body.email });
        const match = await bcrypt.compare(req.body.Password, User.Password);
        if (!match) {
            res.send("password is false");
        } else {
            res.send(jwt.sign({ id: User._id }, 'anysecret'));
        }
    } catch (error) {
        res.send(" user not founnd ");
        console.log(error);
    }
});
 

// get user by id
app.get('/user/:id', async (req, res) => {
       
       try{
      res.json(await user.findById(req.params.id)); }
      catch(error){
          res.send(error);
      }
   
});

// create list
app.post('/list', async (req, res) => {

    try {

        await list.create(req.body);
        res.send("list created ");
    } catch (error) {
        res.send("Error");
        console.log(error);
    }
});
 
// get list by id
app.get('/list/:id/items', async (req, res) => {

     try{
    res.json(await list.findById(req.params.id));}
    catch(error){
        res.send(error);
    }

});

// update list
app.put('/list', async (req,res)=> {

    await list.findOneAndUpdate({ id: req.body.id },req.body);
     res.send("list is updated")
     
});

// delete list by id

app.delete('/list', async (req,res) => {

    await list.findOneAndDelete({id:req.body.id});
    res.send("list was deleted");
});

// create category
app.post('/category', async (req, res) => {

    try {  
        await category.create(req.body);
        res.send(" category is created ");
    } catch (error) {
        res.send("Error");
        console.log(error);
    }
});

// get category 

app.get('/category', async (req, res) => {
    try {
    res.json(await category.find());}
    catch(error){
        res.send(error);
    }

});
// delete category

app.delete('/category/id', async (req, res) => {

    try {
    await category.findOneAndDelete({ id: req.body.id });
    res.send("category was deleted");}
    catch(error){
        res.send(error);
    }
});

// update category
app.put('/category', async (req, res) => {

    await category.findOneAndUpdate({ id: req.body.id }, req.body);
    res.send("category is updated")

});

// create item
app.post('/item', async (req, res) => {

    try {
        await item.create(req.body);
        res.send(" item is created ");
    } catch (error) {
        res.send("Error");
        console.log(error);
    }
});

// get item 

app.get('/item', async (req, res) => {

     try {
    res.send( await item.find()); }
    catch(error){
        res.send(error);
    }});
 
//  delete item

app.delete('/item', async (req, res) => {

    try {
    await item.findOneAndDelete({ id: req.body.id });
    res.send("item was deleted");}
    catch(error){
        res.send(error);
    }
});
 
// update item

app.put('/item', async (req, res) => {

    try {
    await item.findOneAndUpdate({ id: req.body.id }, req.body);
    res.send("item is updated"); }
    catch(error) {
        res.send(error);}

});

app.listen(3000, () => {
    console.log("connection established");
});