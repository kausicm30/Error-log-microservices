var errorCodes = {
    VALIDATION_ERROR: {
        error_code: 'SUB_VALIDATION',
        description: 'Payload validation failed'
    },
    INVALID_USER_ID: {
        error_code: 'SUB_ID',
        description: "Object with following id doesn't exist."
    },
    DB_ERROR: {
        error_code: 'SUB_DB',
        description: 'Querying database failed. Please try again'
    },
    API_ERROR: {
        error_code: 'SUB_API',
        description: 'Executing api event failed.'
    },
    INTERNAL_SERVER_ERROR:{
        error_code:'SUB_INTERNAL ERROR',
        description:'The server has encountered a situation it does not know how to handle'
    },
    PAGE_NOT_FOUND:{
        error_code:'SUB_PAGENOTFOUND ERROR',
        description:'The server could not find the api path'
    }

};

module.exports = errorCodes;