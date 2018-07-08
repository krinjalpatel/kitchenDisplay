var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // create a contacts schema
    dishSchema = new Schema({
        dishName: {
            type: String
        },
        shortName: {
            type: String
        },
        price: {
            type: Number
        }
    }, { collection: 'dish', timestamps: true });
var dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;