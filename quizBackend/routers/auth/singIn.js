const { Router }       = require("express")
const singInValidation = require("../../validations/auth/singIn")
const _                = require("lodash")
const user = require("../../schema/user")
const { generateToken } = require("../../jwt/jwt")

const router = Router()
router.post("/" ,  async ( req , res ) => {
    const {value , error } = singInValidation.validate(_.pick(req.body , ["login" , "password"]))
    if( error ){
        return(
            res
                .status(400)
                .json(
                    {
                        status:"validateError",
                        message:`validatsiya hatoligi ${error.details[0].path.join(" ")} bo'sh` ,
                        target:error.details[0].path
                    }
                )
        )
    }

    const userFind = await user.findOne( value )
    if( !userFind ){
        res
            .status(200)
            .json(
                {
                    status:"error",
                    message:"login yoki parol hato!"
                }
            )
    }


    const token = generateToken(_.pick(userFind , ["_id" , "login"]))
    res
        .cookie("auth" , token)
        .status(200)
        .json(
            {
                status:"success",
                message:"redirect dashboard!",
                user:_.pick(userFind , ["login" , "quizAllRank" , "quizAllTests"])
            }
        )
        
})

module.exports = router