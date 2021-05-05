constexpress=require('express');
constbcrypt=require('bcrypt');
constjwt=require('jsonwebtoken');
constapp=express();
constmongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Assignment1', {​​​​​ useNewUrlParser:true, useUnifiedTopology:true }​​​​​);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {​​​​​
console.log('Connected to the database!');
}​​​​​);

constuserSchema=newmongoose.Schema({​​​​​
Username:String,
Email:String,
Password:String
}​​​​​);

constlistSchema=newmongoose.Schema({​​​​​
Name:String,
user_id:userSchema,
Created_at:String,
Updated_at:String
}​​​​​);

constcategorySchema=newmongoose.Schema({​​​​​
Name:String,
user_id:userSchema,
Created_at:String,
Updated_at:String
}​​​​​);

constitemSchema=newmongoose.Schema({​​​​​
Name:String,
category_id:categorySchema,
Note:String,
Password:String,
Image:String,
Created_at:String,
Updated_at:String
}​​​​​);

constuser=mongoose.model('user', userSchema);
constlist=mongoose.model('list', listSchema);
constcategory=mongoose.model('category', categorySchema);
constitem=mongoose.model('item', itemSchema);
app.use(express.json());

//Registration
app.post('/register', async (req, res) => {​​​​​
try {​​​​​
req.body.Password=awaitbcrypt.hash(req.body.Password, 12);
awaituser.create(req.body);
res.send("user creation done ");
}​​​​​ catch (error) {​​​​​
res.send("Error");
console.log(error);
}​​​​​
}​​​​​);

//Login
app.post('/login', async (req, res) => {​​​​​
try {​​​​​
constUser=awaituser.findOne({​​​​​ email:req.body.email }​​​​​);
constmatch=awaitbcrypt.compare(req.body.Password, User.Password);
if (!match) {​​​​​
res.send("Password Incorrect please try again. ");
}​​​​​ else {​​​​​
res.send(jwt.sign({​​​​​ id:User._id }​​​​​, 'anysecret'));
}​​​​​
}​​​​​ catch (error) {​​​​​
res.send(" User not found please try again.");
console.log(error);
}​​​​​
}​​​​​);

//Getting the user from the id
app.get('/user/:id', async (req, res) => {​​​​​
res.json(awaituser.findById(req.params.id)); 
}​​​​​);    

//List Creation
app.post('/list', async (req, res) => {​​​​​
try {​​​​​
awaitlist.create(req.body);
res.send("List creation done. ");
}​​​​​ catch (error) {​​​​​
res.send("Error");
console.log(error);
}​​​​​
}​​​​​);

//Getting the list from the id
app.get('/list/:id', async (req, res) => {​​​​​
res.json(awaitlist.findById(req.params.id));
}​​​​​);

//Updating list
app.put('/list', async (req,res)=> {
 
    await list.findOneAndUpdate({ id: req.body.id },req.body);
     res.send("list is updated")
     
});

//Deleting the list
app.delete('/list', async (req,res) => {​​​​​
awaitlist.findOneAndDelete({​​​​​id:req.body.id}​​​​​);
res.send("List deleted successfully");
}​​​​​);

//Creating category
app.post('/category', async (req, res) => {​​​​​
try {​​​​​ 
awaitcategory.create(req.body);
res.send(" Category creation done ");
}​​​​​ catch (error) {​​​​​
res.send("Error");
console.log(error);
}​​​​​
}​​​​​);

//Getting category from the id
app.get('/category/:id', async (req, res) => {​​​​​
res.json(awaitcategory.findById(req.params.id));
}​​​​​);

//Deleting category
app.delete('/category', async (req, res) => {​​​​​
awaitcategory.findOneAndDelete({​​​​​ id:req.body.id }​​​​​);
res.send("Category deleted successfully");
}​​​​​);

//Updating category
app.put('/list', async (req,res)=> {
 
    await list.findOneAndUpdate({ id: req.body.id },req.body);
     res.send("Category is updated successfully ")
     
});

//Creating item
app.post('/item', async (req, res) => {​​​​​
try {​​​​​
awaititem.create(req.body);
res.send(" Item creation done");
}​​​​​ catch (error) {​​​​​
res.send("Error");
console.log(error);
}​​​​​
}​​​​​);

//Getting item from the id
app.get('/item/:id', async (req, res) => {​​​​​
res.json(awaititem.findById(req.params.id));
}​​​​​);

//Deleting item
app.delete('/item', async (req, res) => {​​​​​
awaititem.findOneAndDelete({​​​​​ id:req.body.id }​​​​​);
res.send("Item deleted successfully");
}​​​​​);

//Updating item
app.put('/list', async (req,res)=> {
 
    await list.findOneAndUpdate({ id: req.body.id },req.body);
     res.send("Item is updated successfully")
     
});

app.listen(3000, () => {​​​​​
console.log("Connection done");
}​​​​​);
