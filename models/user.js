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
    }

})
// Export model
module.exports = mongoose.model('User', UserSchema)