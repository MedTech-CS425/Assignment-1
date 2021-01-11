require('./config/config');
require('./config/passportConfig');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const express = require('express')
  const app = express()
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const rtsIndex = require('./routes/index.router');
  const passport = require('passport');

  const mongoose = require('mongoose')
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'))

  // middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(passport.initialize());
  
app.listen(process.env.PORT || 3000)