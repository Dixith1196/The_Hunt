const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    id:{
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
    }

})
module.exports = mongoose.model('User', UserSchema)