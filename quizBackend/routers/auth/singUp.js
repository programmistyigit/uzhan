const {Router}         = require("express")
const _                = require("lodash")
const singUpValidation = require("../../validations/auth/singUp")
const user = require("../../schema/user")
const { generateToken } = require("../../jwt/jwt")

const router = Router()

router.post("/" , async (req, res) => {
    const { value , error } = singUpValidation.validate(_.pick(req.body , ["login" , "password" , "confirmPassword"]))
    if(error){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"validateError",
                        message:"validatsiya hatoligi",
                        target:error.details[0].path
                    }
                )
        )
    }

    const fingLogin = await user.findOne({login:value.login}).lean()
    if(fingLogin){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"error",
                        message:"bunday foydalanuvchi oldindan mavjud"
                    }
                )
        )
    }

    const createUser = await user.create(_.pick(value , ["login" , "password"]))
    const token = generateToken(_.pick(createUser ,["_id", "login"]))

    res
        .cookie("auth" , token)
        .status(200)
        .json(
            {
                status:"success",
                message:"login!",
                user:_.pick(createUser , ["login" , "quizAllRank" , "quizAllTests"])
            }
        )
})

module.exports = router