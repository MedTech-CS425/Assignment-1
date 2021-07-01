const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());

const mongoose = require('mongoose');
const { INSPECT_MAX_BYTES } = require('buffer');
mongoose.connect('mongodb://localhost:27017/api', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to database');
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    userName: String
});
const User = mongoose.model('User',UserSchema);

const auth = (req, res, next) => {
    try {
        const {id} =jwt.verify(req.get('Authorization'), 'anysecret');
        const usr = User.findById(id); 
        req.user = usr;
        next();
    } catch(error){
        res.send('Unauthorized Access')
    }
}

app.post('/signup', async (req, res)=> {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        await User.create(req.body);
        res.send('user Created Succesfully');   
    } catch (error) {
        res.send('Problem with server');
    }

});
app.get('/getUser/:id', auth ,async (req, res)=> {
    res.json(await User.findById(req.params.id));
});
app.post('/login', async (req, res)=> {
    try {
        const usr = await User.findOne({email: req.body.email});
        const match = await bcrypt.compare(req.body.password, usr.password)
        if(!match){
            res.send('Wrong Password')
        }else{
            res.send(jwt.sign({id: usr._id}, 'anysecret'))
        }
    } catch (error) {
        console.error(error);
        res.send('Wrong Email')
    }
})

const listSchema = new mongoose.Schema({
    "name": {type: string, required: true},
    "created_at": {type: Date, default: Date.now()},
    "updated_at ": {type: Date, default: Date.now()},
    "user": {type: Schema.Types.ObjectId, ref: 'User'}
})
const List = mongoose.model("List", listSchema);

//operations over list
app.get('/lists', auth ,async(req, res)=> {
    res.json(await List.find());
});

app.post('/api/lists',auth, async (req, res) => {
    try {
        await List.create(req.body);
        res.send('list Created Succesfully');   
    } catch (error) {
        res.send('Problem with server');
    }
});

app.put('/lists/:id', auth, async (req, res) => {
    await List.updateOne(req.params.id);
}) ;
app.delete('/lists/:id', auth, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send('user Deleted')
});

const itemSchema = new mongoose.Schema({
    "neme": string,
    "image": string,
    "note": string,
    "list_id": {type : Schema.Types.ObjectId, ref: 'List'},
    "category_id": {type : Schema.Types.ObjectId, ref: 'Category'}
});
const Item = mongoose.model("Item", itemSchema);

app.get('/lists/:id/items', auth, async (req,res) => {
    res.json(await List.find({"list_id": req.params.id}));
});
app.post('/lists/:id/items', auth, async (req, res) => {
    try{
        await Item.create({...req.body, "list_id": req.params.id});
    }catch (error) {
        res.send('Problem with server');
    }
});
app.put('/lists/:id/items', auth, async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
}) ;
app.delete('/lists/:id/items', async (req, res, next) => {
    await Item.deleteMany(req.params.id);
    res.send('Deleted All items')
});

//operations over items

app.get('/item/',auth,  async (req, res) => {
    res.json(await Item.findById(req.params.id));
});

app.post('/item', async (req, res) => {
    try {
        await Item.create(req.body);
        res.send("item created.");
    }catch (error) {
        res.send('Problem with server');
    }
});
app.put('/item/:id', async (req, res) => {
    await Item.findOneAndUpdate({ id: req.body.id },req.body);
    res.send("The item is updated.")
});
app.delete('/item/:id', async (req, res) => {
    await Item.findOneAndDelete({ id: req.body.id });
    res.send("The item is deleted.");
});

const categorySchema = new mongoose.Schema({
    "Name": String,
    "Created_at": String,
    "Updated_at": String,
    "user_id": {type : Schema.Types.ObjectId, ref: 'User'}
});
const Category = mongoose.model('Category', categorySchema);

//operations over categories

app.get('/categories/', async (req, res) => {
    res.json(await Category.findById(req.params.id));
});
app.post('/categories', async (req, res) => {
    try {  
        await Category.create(req.body);
        res.send("The category is created.");
    }catch (error) {
    res.send('Problem with server');
    }
});


app.put('/categories/:id', async (req, res) => {
    await Category.findOneAndUpdate({ id: req.body.id },req.body);
    res.send(" category updated.")
});

app.delete('/categories', async (req, res) => {
    await Category.findOneAndDelete({ id: req.body.id });
    res.send("The category is deleted.");
});


app.listen(3000, ()=>{
    console.log('App Listening on Port 3000');
})
