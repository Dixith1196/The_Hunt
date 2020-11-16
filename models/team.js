const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
 var connection = mongoose.createConnection("mongodb+srv://vikas2005:vikas2005@cluster0.mkp5q.azure.mongodb.net/test?retryWrites=true&w=majority");
autoIncrement.initialize(connection)

const TeamSchema = new Schema({

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

});
TeamSchema.plugin(autoIncrement.plugin, {
    model: 'team',
    field: 'teamid',
    startAt: 1,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Team', TeamSchema)