const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Assignment1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log('we are connected!');
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

// User registration

app.post('/register', async (req, res) => {

    try {

        req.body.Password = await bcrypt.hash(req.body.Password, 12);
        await user.create(req.body);
        res.send("Successful operation ");
    } catch (error) {
        res.send("sorry we had a problem");
        console.log(error);
    }
});

 //User Login

app.post('/login', async (req, res) => {

    try {
        const User = await user.findOne({ email: req.body.email });
        const match = await bcrypt.compare(req.body.Password, User.Password);
        if (!match) {
            res.send("wrong password");
        } else {
            res.send(jwt.sign({ id: User._id }, 'anysecret'));
        }
    } catch (error) {
        res.send(" user not founnd please check again");
        console.log(error);
    }
});

//Get user by ID

app.get('/user/:id', async (req, res) => {

       try{
      res.json(await user.findById(req.params.id)); }
      catch(error){
          res.send(error);
      }

});

// Create List

app.post('/list', async (req, res) => {

    try {

        await list.create(req.body);
        res.send("list created ");
    } catch (error) {
        res.send("sorry we had a problem");
        console.log(error);
    }
});

//Get List by ID

app.get('/list/:id/items', async (req, res) => {

     try{
    res.json(await list.findById(req.params.id));}
    catch(error){
        res.send(error);
    }

});

//Update List

app.put('/list', async (req,res)=> {

    await list.findOneAndUpdate({ id: req.body.id },req.body);
     res.send("list is updated")

});

//Delete List

app.delete('/list', async (req,res) => {

    await list.findOneAndDelete({id:req.body.id});
    res.send("it was deleted");
});

//Create category

app.post('/category', async (req, res) => {

    try {  
        await category.create(req.body);
        res.send(" category created ");
    } catch (error) {
        res.send("sorry we had a problem");
        console.log(error);
    }
});

//Get category 

app.get('/category', async (req, res) => {
    try {
    res.json(await category.find());}
    catch(error){
        res.send(error);
    }

});

//Delete category

app.delete('/category/id', async (req, res) => {

    try {
    await category.findOneAndDelete({ id: req.body.id });
    res.send("it was deleted");}
    catch(error){
        res.send(error);
    }
});

//Update category

app.put('/category', async (req, res) => {

    await category.findOneAndUpdate({ id: req.body.id }, req.body);
    res.send("category is updated")

});

//Create item

app.post('/item', async (req, res) => {

    try {
        await item.create(req.body);
        res.send(" item created ");
    } catch (error) {
        res.send("sorry we had a problem");
        console.log(error);
    }
});

//Get item 

app.get('/item', async (req, res) => {

     try {
    res.send( await item.find()); }
    catch(error){
        res.send(error);
    }});

//Delete item

app.delete('/item', async (req, res) => {

    try {
    await item.findOneAndDelete({ id: req.body.id });
    res.send("it was deleted");}
    catch(error){
        res.send(error);
    }
});

//Update item

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