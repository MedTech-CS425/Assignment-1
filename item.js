const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
const authorize = require('./authorize');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category_id: { type: String, required: true },
    user_id : { type: String, required: true },
    note : { type: String, required: false}, 
    image : { type: String, required: false},
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
})
const items = mongoose.model('items', itemSchema);

router.get('/', authorize, async (req,res)=>{
    try{
        const item = items.findById({user_id : req.user.id})
        res.send(item); 
     }
         catch(err) {res.send(err)}
     })


router.post('/', authorize, async (req,res)=>{
    try{
        const item = new items({
            name: req.body.name,
            category_id: req.body.category_id,
            user_id: req.user.id,
            note :req.body.note , 
            image : req.body.image,
            created_at: new Date()
        }); 
        res.send(item); 
     }
         catch(err) {res.send(err)}
     
})

router.put('/:id', authorize, async (req,res)=>{
    try{
        const item = items.findOneAndUpdate({ _id: req.params.id },{name: req.body.name, note: req.body.note , image : req.body.image ,category_id:req.body.category_id},{upsert: true}); 
        res.send(item);      
        }
         catch(err) {res.send(err)}
     
})

router.delete('/:id', authorize, async (req,res)=>{
    try{
        const item = items.findOneAndDelete({_id : req.params.id});
        res.send(item);  
     }
         catch(err) {res.send(err)}
     })


module.exports = router;
