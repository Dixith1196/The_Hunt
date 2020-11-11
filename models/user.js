const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    userid:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength:10,
        required: true
    }


})
// Export model
module.exports = mongoose.model('User', UserSchema)