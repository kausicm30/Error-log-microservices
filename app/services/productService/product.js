let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let Product = require('../../models/product')
let errorCodes = require('../../../error-code');
class ProductService{
    static async createProduct(req,res){
        var details = {
            name : req.body.name,
            price : req.body.price,
            weight : req.body.weight,
            type : req.body.type,
            user_id:req.body.user_id
        }
        //await Product({name : req.body.name}).save()
        await Product(details).save()
        .then(function(data){
            return res.status(200).json({"status":true,"data":data ,"message": "product is added successfully"});
        })
        .catch(function(err){
            return res.status(500).json({"status":false,"message":"Error occurred in DB","error_obj":errorCodes.INTERNAL_SERVER_ERROR});
        })
      }
}
module.exports = ProductService;