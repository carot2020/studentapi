const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    name: String,
    address: String,
    image:String,
    gender: Boolean
}, {collection: 'Students', versionKey: false});
module.exports = mongoose.model('Students', StudentSchema);
