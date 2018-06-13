const Joi = require("joi");

const ResetSchema = {
  email: Joi.string()
    .email()
    .required(),
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required()
};

module.exports = {
  ResetSchema: Joi.object().keys(ResetSchema)
};
