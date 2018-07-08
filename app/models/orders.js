var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // create a contacts schema
    orderSchema = new Schema({
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
        status: {
            type: Boolean,
            default: false
        }
    }, { collection: 'orders', timestamps: true });
var orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;