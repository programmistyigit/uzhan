const Joi = require("joi")
const singUpValidation = Joi.object({
    login:Joi.string().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required()
})
module.exports = singUpValidation