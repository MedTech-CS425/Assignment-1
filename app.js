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

var userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: 'Email can\'t be empty',
      unique: true
  },
  password: {
      type: String,
      required: 'Password can\'t be empty',
      minlength: [4, 'Password must be atleast 4 character long']
  },
  saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
       process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}