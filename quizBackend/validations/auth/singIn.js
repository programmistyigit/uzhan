const Joi = require("joi")
const singInValidation = Joi.object({
    login:Joi.string().required(),
    password:Joi.string().required()
})
module.exports = singInValidation