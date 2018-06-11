const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    _id: Joi.objectId(),
    userId: Joi.objetId(),


}