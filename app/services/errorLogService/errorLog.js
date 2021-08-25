let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const moment = require('moment');
const today = moment().startOf('day')
let ErrorLog = require('../../models/errorLog');
let errorCodes = require('../../../error-code');
class Error{
    static async createErrorLog(req, res){
        await new ErrorLog(req.body).save()
        .then(function(data){
            return res.status(200).json({"status":true,"data":data ,"message": "error added in DB successfully"});
        })
        .catch(function(err){
            return res.status(500).json({"status":false,"message":"Error occurred in DB","error_obj":errorCodes.INTERNAL_SERVER_ERROR});
        })
    }
    static async getAllErrorLogs(req,res){
        let errors = await ErrorLog.find();
        if(errors.length>=0){
            return res.status(200).json({"status":true,"data":errors ,"message": "All errors retrieved successfully"});
        }else{
            return res.status(500).json({"status":false,"message":"Error occurred in DB","error_obj":errorCodes.INTERNAL_SERVER_ERROR});
        }

    }

    static async deleteErrorLog(req,res){
        var details = await ErrorLog.findOne({user_id:req.query.user_id});
        if(details){
            details.archive();
            return res.status(200).json({"status":true,"data":details, "message":"removed successfully"});
        }else{
            return res.status(500).json({"status":false,"message":"Invalid User Id","error_obj":errorCodes.INVALID_USER_ID});
        }
    }
    static async archiveErrorLogs(req,res){
        var details = await ErrorLog.where('archivedAt').exists();
        if(details.length>=0){
            return res.status(200).json({"status":true,"data":details, "message":"retrieved successfully"});
        }else{
            return res.status(500).json({"status":false,"message":"Error occurred in DB","error_obj":errorCodes.INTERNAL_SERVER_ERROR});
        }
    }
    static async todayErrorLogs(req,res){
        let errors = await ErrorLog.find({
            createdAt: {
              $gte: today.toDate(),
              $lte: moment(today).endOf('day').toDate()
            }
          });
        if(errors.length>=0){
            return res.status(200).json({"status":true,"data":errors ,"message": "Successfully retrieved today error logs"});
        }else{
            return res.status(500).json({"status":false,"message":"Error occurred in DB","error_obj":errorCodes.INTERNAL_SERVER_ERROR});
        }
    }
    static async fetchError(req,res){
        let errors = await ErrorLog.find({request_id:req.query.request_id});
        return res.status(200).json({"status":true,"data":errors ,"message": "error retrieved succesfully"});
    }
}
module.exports=Error;