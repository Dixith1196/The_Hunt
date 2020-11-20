const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
 var connection = mongoose.createConnection("mongodb+srv://vikas2005:vikas2005@cluster0.mkp5q.azure.mongodb.net/test?retryWrites=true&w=majority");
autoIncrement.initialize(connection)

const QuestSchema = new Schema({
   
    questname: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        unique: true
    },
    queststartlocationlongitude: {
        type: String,
        required: true,
        // unique: true  
    },
    queststartlocationlatitude: {
        type: String,
        required: true,
        // unique: true     
    },
    creatoruserid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});
QuestSchema.plugin(autoIncrement.plugin, {
    model: 'quest',
    field: 'questid',
    startAt: 1,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Quest', QuestSchema)