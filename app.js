const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Assignment1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log('Successfully connected!');
});
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Password: String
});
const listSchema = new mongoose.Schema({
 
   
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
 //Register 
app.post('/register', async (req, res) => {
 
    try {
 
        req.body.Password = await bcrypt.hash(req.body.Password, 12);
        await user.create(req.body);
        res.send("User successfully created ");
    } catch (error) {
        res.send("Error while creating user");
        console.log(error);
    }
});
//Login  
app.post('/login', async (req, res) => {
 
    try {
        const User = await user.findOne({ email: req.body.email });
        const match = await bcrypt.compare(req.body.Password, User.Password);
        if (!match) {
            res.send("Wrong password please try again");
        } else {
            res.send(jwt.sign({ id: User._id }, 'anysecret'));
        }
    } catch (error) {
        res.send(" User not found please check again");
        console.log(error);
    }
});
 //get user by id
app.get('/user/:id', async (req, res) => {
try{
       res.json(await user.findById(req.params.id)); 
}catch(error){
       res.send("Error while getting user");
       console.log(error);
}
});


 // List
 //Create list
app.post('/list', async (req, res) => {
 
try {
 
        await list.create(req.body);
        res.send("List successfully created ");
    } catch (error) {
        res.send("Error while creating list");
        console.log(error);
    }
});
 // Get list by id
app.get('/list/:id', async (req, res) => {
try{
    res.json(await list.findById(req.params.id));
    }catch(error){
        res.send("Error while getting list");
        console.log(error);
    }
});
// update list
app.put('/list', async (req,res)=> {
try{
    await list.findOneAndUpdate({ id: req.body.id },req.body);
    res.send("List updated")
    }catch(error){
        res.send("Error while updating list");
        console.log(error);
    }
});

// delete list
app.delete('/list', async (req,res) => {
try{
   await list.findOneAndDelete({id:req.body.id});
   res.send("List deleted");
}catch(error){
    res.send("Error while deleting list");
        console.log(error);
}
});


//Category
// create category
app.post('/category', async (req, res) => {

try {  
       await category.create(req.body);
       res.send(" Category successfully created ");
   } catch (error) {
       res.send("Error while creating category");
       console.log(error);
   }
});

// get category by id
app.get('/category/:id', async (req, res) => {
try{
   res.json(await category.findById(req.params.id));
    }catch(error){
        res.send("Error while getting category");
        console.log(error);
    }
});
// delete category

app.delete('/category', async (req, res) => {
try{
   await category.findOneAndDelete({ id: req.body.id });
   res.send("Category");
}catch(error){
    res.send("Error while deleting category");
        console.log(error);
}
});

// update category
app.put('/category', async (req, res) => {
try{
    await category.findOneAndUpdate({ id: req.body.id },req.body);
   res.send("Category updated")
    }catch(error){
        res.send("Error while updating category");
        console.log(error);
    }

});


//item
// create item
app.post('/item', async (req, res) => {

 try {
       await item.create(req.body);
       res.send("Item successfully created ");
   } catch (error) {
       res.send("Error while creating item");
       console.log(error);
   }
});

// get item by id 
app.get('/item/:id', async (req, res) => {
try{
   res.json(await item.findById(req.params.id));
    }catch(error){
        res.send("Error while getting item");
        console.log(error);
    }
});

// delete item
app.delete('/item', async (req, res) => {
try{
   await item.findOneAndDelete({ id: req.body.id });
   res.send("Item deleted");
}catch{
    res.send("Error while deleting item");
        console.log(error);
}
});

// update item
app.put('/item', async (req, res) => {
 try{
   await item.findOneAndUpdate({ id: req.body.id },req.body);
   res.send("Item updated")
    }catch{
        res.send("Error while updating item");
        console.log(error);
        
    }
});
 
app.listen(3000, () => {
    console.log("connection established");
});
