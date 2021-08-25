let express = require('express');
let router = express.Router();
let Product = require('../services/productService/product');
let { Validator, ValidationError } = require('express-json-validator-middleware');
let validator = new Validator({allErrors: true});
let validate = validator.validate;
let ProductSchema = require('../utils/validators/productSchema');
let errorCodes = require('../../error-code');

router.post('/create',validate({body:ProductSchema.createProductSchema}),async (req, res) => {
    try{
        Product.createProduct(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
    }
});

router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(400).json({"status":false, "message":"Missing fields in payload", "error_obj":errorCodes.VALIDATION_ERROR});
    }
    else next(err);
 });

module.exports = router;