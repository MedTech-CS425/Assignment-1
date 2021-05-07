const express = require('express');
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/static",express.static("public"));

app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/assignment1 ', { useNewUrlParser:true , useUnifiedTopology: true});
mongoose.connection.on('error',console.error.bind(console,'connection error'));
mongoose.connection.once('open',function(){
    console.log('connected to database')
});

    const userSchema= new mongoose.Schema({
        email:String,
        username: String,
        password: String
    });
    const User= mongoose.model('User', userSchema);

    const itemsSchema= new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
   name: String,
   category_id:Number,
   user_id:	Number,
   note	:String,
   image: String,
   created_at:String,
  updated_at:String
    });
    const Items= mongoose.model('Items',itemsSchema);

    app.post ('/additem',async (req,res)=>{
        const items=new Items({
            
            name: req.body.name,
            category_id: req.body.category_id,
            user_id: req.body.user_id,
            note: req.body.note,
            image: req.body.image,
            created_at: req.body.created_at,
           updated_at: req.body.updated_at

        });
        try{
        await items.save();
        res.send('items added');
    }
      catch(error){
          res.send('error occured');


      }
    });

    app.get('/items',async(req,res)=>{
      res.json( await Items.find());
    });



app.route("/update").put(function(req, res) {
  Items.updateOne({ name: req.body.name }, function( err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
});
});

app.delete('/items/:id', async (req, res) =>{
    try {
      await Items.findByIdAndRemove(req.params.id);
      res.send('item Deleted');
    } catch (error) {
      res.send(error);
    }
  });
     const listSchema = new mongoose.Schema({
                _id	:mongoose.Schema.Types.ObjectId,
                name: String,
                user_id:Number,
                item: 
                {type: mongoose.Schema.Types.ObjectId , ref:'Items' },
                created_at:String,
               updated_at:String
            
         
     });
     const list= mongoose.model('list',listSchema);

     app.post ('/list',async (req,res)=>{
    
        
        try{
            await list.create(req.body);
            res.send('list created successfully');
            
            }
            
            catch(error){
                res.send('eroor occured');
            }
            });

            app.get('/list',async(req,res)=>{
                res.json(await list.find({}));
            });

            app.delete('/list/:id', async (req, res) =>{
                try {
                  await list.findByIdAndRemove(req.params.id);
                  res.send('list deleted');
                } catch (error) {
                  res.send(error);
                }
              });

              app.put('/updatelist/:id', async (req, res)=> {
                try{
              await list.findOneAndUpdate(req.body);
              res.send("list updated succesfully");
                }
              catch(error){
                  res.send("error");
              }
                });
               
app.post("/list/:id/items", (req, res, next) => {
    Items.findById(req.body.itemId)
      .then(item => {
        if (!item) {
          return res.status(404).json({
            message: "item not found"
          });
        }
        const List = new list({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            user_id: req.body.user_id,
            item: req.body.itemId,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
          
            
          });
          return List.save();
        })
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "list stored",
            createdlist: {
              _id: result.id,
              name: result.name,
              user_id: result.user_id,
              item: result.item,
              created_at:result.created_at,
              updated_at:result.updated_at
              
             
            },
            request: {
              type: "GET",
              url: "http://localhost:3000/list/:id/items" + result._id
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });

    app.get("/list/:id/items", (req, res, next) => {
        list.find()
          .select("items")
          .exec()
          .then(docs => {
            res.status(200).json({
              lists: docs.map(doc => {
                return {
                  _id: doc._id,
                  item: doc.item,
                  user_id :doc.user_id,
                  request: {
                    type: "GET",
                    url: "http://localhost:3000/list/:id/items" + doc._id
                  }
                };
              })
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      });
    

      app.delete('/list/:id/items', async (req, res) =>{
        try {
          await list.findByIdAndRemove(req.params.id);
          res.send('list is  Deleted');
        } catch (error) {
          res.send(error);
        }
      });










     const categorySchema= new mongoose.Schema({
        id	:Number,
        name: String,
        user_id:Number,
        created_at:String,
       updated_at:String
     })
     const category=mongoose.model('category',categorySchema);


     app.post ('/addcategory',async (req,res)=>{
        const categories=new category({
            id: req.body.id,
            name: req.body.name,
            user_id: req.body.user_id,
        created_at: req.body.created_at,
           updated_at: req.body.updated_at

        });
        try{
        await categories.save();
        res.send('category added');
    }
      catch(error){
          res.send('error occured');


      }
    });
    app.get('/categories',async(req,res)=>{
        res.json( await category.find());
      });


      app.put('/updatecategory/:id', async (req, res)=> {
          try{
        await category.findOneAndUpdate(req.body);
        res.send("updated category");
          }
        catch(error){
            res.send("error");
        }
          });
      
      


      
app.delete('/categories/:id', async (req, res) =>{
    try {
      await category.findByIdAndRemove(req.params.id);
      res.send('category deleted');
    } catch (error) {
      res.send(error);
    }
  });



    const auth = (req, res, next) => {
        try {
            const {id} = jwt.verify(req.get('Authorization'), 'anysecret');
            const usser = User.findById(id);
            req.user = usser;
            next();
        } catch (error) {
            res.send('Unauthorized Access')
        }
    }
    app.get('/users',auth, async (req,res)=>{
        res.json(await User.find());
    });

    app.get('/users/:id', auth ,async (req, res)=> {
        res.json(await User.findById(req.params.id));
    });

    app.post('/register', async(req,res)=>{
        try{
     req.body.password = await bcrypt.hash(req.body.password, 12);
    await User.create(req.body);
    res.send('user created successfully');
    
    }
    
    catch(error){
        res.send('error occured');
    }
    });


    app.post('/login',async (req,res)=>{
        try {
      const user=await User.findOne({email: req.body.email});
      const match=await bcrypt.compare(req.body.password, user.password)
      if(!match){
      res.send('wrong password');
                  } 
                  
                  else{
                 res.send(jwt.sign({id: user._id}, 'anysecret'))
                  
                  }
            }
     catch (error) {
            
            res.send('error occured');
        }
    });

   

       
       
      




app.listen(3001, function(){
    console.log("server is running on por 3001 ");
});

