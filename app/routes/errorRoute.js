let express = require('express');
let router = express.Router();
let Error  = require('../services/errorLogService/errorLog');
let errorCodes = require('../../error-code');

//create error log
router.post('/createErrorLog', async (req, res)=>{
    try{
        Error.createErrorLog(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
    }
});

//get all error logs
router.get('/getAllErrorLogs',async(req,res)=>{
    try{
        Error.getAllErrorLogs(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
    }
});

//instead of remove the errorlog we archive it
router.get('/deleteErrorLog',async(req,res)=>{
    try{
        Error.deleteErrorLog(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
    }
});

//get all archiveErrorLogs
router.get('/archive',async(req,res)=>{
    try{
        Error.archiveErrorLogs(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
    }
});

//get today error logs
router.get('/todayErrorLogs',async(req,res)=>{
    try{
        Error.todayErrorLogs(req, res);
    }
    catch(err){
        res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
    }
});

//get specific error based on request_id
router.get('/fetch', async(req,res)=>{
try{
    Error.fetchError(req, res);
}
catch(err){
    res.status(500).json({"status":false, "message":"Api event execution failed", "error_obj":errorCodes.API_ERROR});
}
})

module.exports = router;