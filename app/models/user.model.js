var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    fname: String,
    lname: String,
    cnic: String,
    email:String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User',UserSchema);