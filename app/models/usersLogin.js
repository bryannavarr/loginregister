const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  _id: Joi.objectId(),
  userId: Joi.objectId(),
  createDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of creation"),
  updateDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of update")
};

module.exports = Joi.object().keys(schema);
