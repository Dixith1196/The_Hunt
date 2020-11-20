const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
 var connection = mongoose.createConnection("mongodb+srv://vikas2005:vikas2005@cluster0.mkp5q.azure.mongodb.net/test?retryWrites=true&w=majority");
autoIncrement.initialize(connection)

const ClueSchema = new Schema({

  
    cluestring: {
        type: String,
        minlength: 3,
        maxlength: 200,
        required: true
    },

    locationid:[{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }]

});
TeamSchema.plugin(autoIncrement.plugin, {
    model: 'clue',
    field: 'clueid',
    startAt: 1,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Clue', ClueSchema)