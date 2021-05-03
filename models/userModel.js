const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    }
});

module.exports('User', UserSchema); //USER TARJAA ALA CHKOUN?