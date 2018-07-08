var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // create a contacts schema
    createdTillDishSchema = new Schema({
        dishId:{
            type:Schema.ObjectId,
            ref: 'dish'
        },
        dishName: {
            type: String
        },
        quantity: {
            type: Number
        },
        createdTill: {
            type: Number
        }
    }, { collection: 'createdTillDish', timestamps: true });
var createdTillDishModel = mongoose.model('createdTillDish', createdTillDishSchema);
module.exports = createdTillDishModel;