var createProductSchema = {
    type:'object',
    required:['name','price','weight','type','user_id'],
    properties:{
        name:{type:'string'},
        price:{type:'string'},
        weight:{type:'string'},
        type:{type:'string'},
        user_id:{type:'string'}
    }
}

var ProductSchema ={
    "createProductSchema" : createProductSchema
}

module.exports = ProductSchema;