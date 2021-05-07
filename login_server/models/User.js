const mongoose = require('mongoose');
const schema = mongoose.schema;
 
const UserSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date
});

const User = mongoose.model ('User', UserSchema);

module.exports = User;