let mongoose  = require('mongoose');
let mongooseArchive = require('mongoose-archive');

let ErrorLogSchema = new mongoose.Schema(
    {
        request_id : {type:"string", required:true, index:true},
        user_id : {type:"string", index:true, required:true},
        version : {type:"string",index:true, required:true},
        microservice_name : {type:"string", index:true, required:true},
        module : {type:"string",index:true, required:true},
        path : {type:"string", required:true},
        status_code : {type:"string",index:true, required:true},
        error_msg : {type:"string", required:true},
        error_obj : {type:"object",required:true}
    },
    {timestamps:true},
    {versionKey: false}
);

ErrorLogSchema.plugin(mongooseArchive);
module.exports = mongoose.model('ErrorLog',ErrorLogSchema,'ErrorLogging');