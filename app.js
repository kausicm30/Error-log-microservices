let express = require('express');
let axios = require('axios');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let errorCodes=require('./error-code');

// var cuid = require('cuid');
// console.log( cuid() );

app.get('/', async (req, res)=>{
    res.status(200).json({"Status":true, "Message": "Welcome"});
});


//import all routes from
let db = require('./app/utils/database');
let product = require('./app/routes/product');
let errorRoute = require('./app/routes/errorRoute');

async function callErrorLogService(req,res,event_Id){
    if(!res.status){
        var url = req.originalUrl;
        var path = url.split('/');
        var request_id = "11"+event_Id.toString();
        //console.log(req.headers['x-correlation-id']);
        if(process.env.EUNIMART_COORELATION_ID == req.headers['x-correlation-id']){
            request_id = "10"+event_Id.toString();
        }

        var body={
            "request_id": request_id,
            "user_id":req.body.user_id || req.query.user_id || req.params.user_id,
            "version":path[3],
            "microservice_name":path[2],
            "module":path[4],
            "path":req.path,
            "status_code":event_Id.toString(),
            "error_msg":res.message,
            "error_obj":res.error_obj
        }
        console.log(body);
        var config = {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json'
            },
            data : body,
            url: `http://localhost:3030/api/errorlog-service/v1/errors/createErrorLog`
          }
        await axios(config);
    }
}

app.use( function(req, res, next) {
    let oldSend = res.send;
    res.send = async function(data){
        var response = JSON.parse(data);
        await callErrorLogService(req,response,res.statusCode);

        oldSend.apply(res, arguments);
    }
    next();
});

//use all routes
db.dbConnection();
app.use('/api/product-service/v1/products/', product);
app.use('/api/errorlog-service/v1/errors/',errorRoute);


app.get('**', function (req, res){
    return res.status(404).json({"status":true,"message":"Page not found","error_obj":errorCodes.PAGE_NOT_FOUND});
});



app.listen(process.env.PORT|3030, function(req,res)
{
    console.log(`Server listening the port : ${process.env.PORT}`);
});
require('dotenv').config();