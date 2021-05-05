const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
const authorize = require('./authorize');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
})

const categories = mongoose.model('categories', categorySchema);
router.get('/', authorize, async (req,res)=>{
    try{
        const category = categories.findById({user_id : req.user.id})
        res.send(list); 
     }
         catch(err) {res.send(err)}
     })


router.post('/', authorize, async (req,res)=>{
    try{
        const category = new categories({
            name: req.body.name,
            user_id: req.user.id,
            created_at: new Date()
        }); 
        res.send(category); 
     }
         catch(err) {res.send(err)}
     
})

router.put('/:id', authorize, async (req,res)=>{
    try{
        const category = categories.findOneAndUpdate({ _id: req.params.id },{name: req.body.name,updated_at: new Date()},{upsert: true}); 
        res.send(category);      
        }
         catch(err) {res.send(err)}
     
})

router.delete('/:id', authorize, async (req,res)=>{
    try{
        const category = categories.findOneAndDelete({_id : req.params.id});
        res.send(category);  
     }
         catch(err) {res.send(err)}
     })


module.exports = router; 