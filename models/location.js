const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
 var connection = mongoose.createConnection("mongodb+srv://vikas2005:vikas2005@cluster0.mkp5q.azure.mongodb.net/test?retryWrites=true&w=majority");
autoIncrement.initialize(connection)

const LocationSchema = new Schema({

   
   
    locationlongitude: {
        type: Number,
        required: true,
        unique: true
        
    },
    locationlatitude: {
        type: Number,
        required: true,
        unique: true
        
    },
    locationvalue: {
        type : Number,
        required: true,
        unique: false,
        default: '10'
    },

    questid:[{
        type: Schema.Types.ObjectId,
        ref: 'Quest'
    }]

});
LocationSchema.plugin(autoIncrement.plugin, {
    model: 'location',
    field: 'locationid',
    startAt: 1,
    incrementBy: 1
});
// Export model
module.exports = mongoose.model('Location', LocationSchema)