const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const baseSchema = {
  _id: Joi.objectId(),
  createDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of creation"),
  updateDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of update")
};

const emailSchema = {
  email: Joi.string()
    .email()
    .required()
};

const registerSchema = {
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
};

module.exports = {
  baseSchema: Joi.object().keys(baseSchema),
  registerSchema: Joi.object()
    .keys(registerSchema)
    .keys(baseSchema)
};
