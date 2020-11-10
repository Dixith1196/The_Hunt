const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({

    teamid:{
        type: Number,
        required: true,
        unique: true
    },
    teamname: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        unique: true
    }

})
// Export model
module.exports = mongoose.model('Team', TeamSchema)