const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/Assignment1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function () {
    console.log('Connection established');
});

const userSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String
});

const listSchema = new mongoose.Schema({
    Name: String,
    user_id: userSchema,
    Created_at: String,
    Updated_at: String  
});

const categorySchema = new mongoose.Schema({
    Name: String,
    user_id: userSchema,
    Created_at: String,
    Updated_at: String
});

const itemSchema = new mongoose.Schema({
    Name: String,
    category_id: categorySchema,
    Note: String,
    Password: String,
    Image: String,
    Created_at: String,
    Updated_at: String
});

const user = mongoose.model('user', userSchema);
const list = mongoose.model('list', listSchema);
const category = mongoose.model('category', categorySchema);
const item = mongoose.model('item', itemSchema);
app.use(express.json());

// User registration
app.post('/signup', async (req, res) => {
    try {
        req.body.Password = await bcrypt.hash(req.body.Password, 20);
        await user.create(req.body);
        res.send("User successfully created!");
    } catch (error) {
        res.send("A problem occured");
        console.log(error);
    }
});

 // User login
app.post('/signin', async (req, res) => {
    try {
        const User = await user.findOne({ email: req.body.email });
        const match = await bcrypt.compare(req.body.Password, User.Password);
        if (!match) {
            res.send("The password is wrong.");
        } else {
            res.send(jwt.sign({ id: User._id }, 'anysecret'));
        }
    } catch (error) {
        res.send("User not found.");
        console.log(error);
    }
});

// get user by id
app.get('/user/:id', async (req, res) => {
    try {
    res.json(await user.findById(req.params.id)); 
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// Creation of list
app.post('/list', async (req, res) => {
  try {
      await list.create(req.body);
      res.send("The list is created.");
  } 
  catch (error) {
      res.send("A problem occured...");
      console.log(error);
  }
});

// get list by id
app.get('/list/:id', async (req, res) => {
    try {
    res.json(await list.findById(req.params.id));
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// Update list
app.put('/list', async (req,res)=> {
    try {
    await list.findOneAndUpdate({ id: req.body.id },req.body);
     res.send("The list is updated.")
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }  
});

// Delete list
app.delete('/list', async (req,res) => {
    try {
    await list.findOneAndDelete({id:req.body.id});
    res.send("The list is deleted.");
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// Creation of category
app.post('/category', async (req, res) => {
    try {  
        await category.create(req.body);
        res.send("The category is created.");
    } 
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// get category by id
app.get('/category/:id', async (req, res) => {
    try {
    res.json(await category.findById(req.params.id));
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// Delete category
app.delete('/category', async (req, res) => {
    try {
    await category.findOneAndDelete({ id: req.body.id });
    res.send("The category is deleted.");
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// Update category
app.put('/category', async (req, res) => {
    try {
    await category.findOneAndUpdate({ id: req.body.id },req.body);
    res.send("The category is updated.")
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// Creation of item
app.post('/item', async (req, res) => {
    try {
        await item.create(req.body);
        res.send("The item is created.");
    } catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

// get item by id 
app.get('/item/:id', async (req, res) => {
    try {
    res.json(await item.findById(req.params.id));
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});
 
// Delete item
app.delete('/item', async (req, res) => {
    try {
    await item.findOneAndDelete({ id: req.body.id });
    res.send("The item is deleted.");
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});
 
// Update item
app.put('/item', async (req, res) => {
    try {
    await item.findOneAndUpdate({ id: req.body.id },req.body);
    res.send("The item is updated.")
    }
    catch (error) {
        res.send("A problem occured...");
        console.log(error);
    }
});

app.listen(3301, () => {
    console.log("Connection established at http://localhost:3301");
});