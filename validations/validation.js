const { object } = require("joi")

const options = {
    abortEarly: true
}
//validate the schema with data
const validation = (schema) => async (req, res, next) => {

    const { error } = await schema.validate(req.body, options)
    if (error) {
        let response = {
            "status": "false",
            "statusCode": 400,
            message: "from validation",
            "Error": error.details[0].message
        }
        res.status(400).json(response)
    }
    else {
        return next();
    }
}
//function for validating params,body
const allValidation = (schema) => async (req, res, next) => {
    //grouping objects

     const { error } = await schema.validate(req, options)
    if (error) {
        let response = {
            "status": "false",
            "statusCode": 400,
            "message": "from validation",
            "Error": error.details[0].message
        }
        res.status(422).json(response)
    }
    else {
        return next();
    }
}

module.exports = { validation, allValidation };