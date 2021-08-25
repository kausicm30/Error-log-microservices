let mongoose = require('mongoose');
var  productSchema = new mongoose.Schema({
        name: {type: String, required: true},
        price: {type: String, required: true},
        weight : {type: String, required: true},
        type : {type: String, required: true},
        user_id:{type:String, required: true}
    },
    { versionKey: false }
);

module.exports = mongoose.model('Product',productSchema,'products');