const express = require('express');
const app = express();
const fs = require('fs');
const bluebird = require('bluebird');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const lists = require('./list'); 
const items = require('./item'); 
const categories = require('./category'); 
const users = require('./user'); 

mongoose.connect("mongodb+srv://Karim:LaKrim@123@cluster0.sgoys.mongodb.net/test" , {useNewUrlParser: true, useUnifiedTopology: true}).
catch (() =>{
    console.log('Connection ERROR');
  });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use(express.json())
app.get('/', (req, res) => {
    res.send('<h1>LAKRIM STORE!<h1>');
})

app.use('/lists', lists); 
app.use('/categories', categories); 
app.use('/items', items); 
app.use('/', users); 


app.listen(3000, () => {
    console.log(`app lisening on ${3000}..`);
})