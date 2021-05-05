const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt'); 
const router = express.Router(); 
const authorize = require('./authorize');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
});

const users = mongoose.model('users', userSchema);


router.post('/login', async (req, res) => {
    try {
      const user = await users.findOne({email: req.body.email});
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

  router.post('/signup', async (req,res)=>{
      try{
        bcrypt.hash(req.body.password, 10, (err, password)=> {
            if (err){
                return res.send(err); 
            }
            const newuser = new users({
                email : req.body.email, 
                username: req.body.username,
                password: password
            })
            newuser.save(); 
            res.send('User Registered')
        })
      }
      catch(error){
        res.send(error); 
      }
  })

  router.get('/getuser', authorize, async (req,res)=>{
      try {
        const user = await users.findById(req.user.id); 
        res.send(user); 
      }
      catch(error){
          res.send(error)
      }
  })




  //TEMPLATE

 
