const express = require('express');

const mongoose = require('mongoose');


const app = express();

app.use(express.json());




//Connection to db 
//Feel free to add your own link & name for db 
mongoose.connect('mongodb:/localhost:27017/Storify',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB succeeded.'))
  .catch(() => console.log('Connection to MongoDB failed.'));


const authRoutes = require('./routes/Auth');
const listRoutes = require('./routes/Lists');
const categoryRoutes = require('./routes/Categories');
const itemRoutes = require('./routes/Items');


app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);


module.exports = app;


