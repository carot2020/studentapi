const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: String,
    fullname: String,
    password : String,
    address: String,
}, {collection: 'Users', versionKey: false});



module.exports = mongoose.model('Users', UserSchema);
