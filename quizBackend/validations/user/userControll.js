const Joi = require("joi");

const userControllValidate = Joi.object({
    quizAllRank:Joi.string().valid("update" , "not").required()
})
module.exports = userControllValidate