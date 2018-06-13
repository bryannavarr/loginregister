const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  _id: Joi.objectId(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  createDate: Joi.date()
    .iso()
    .defatul(() => new Date(), "time of creation"),
  updateDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of update")
};

module.exports = Joi.object().keys(schema);
