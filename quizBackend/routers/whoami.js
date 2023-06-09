const {Router} = require("express")
const user = require("../schema/user")
const { reGenerateToken } = require("../jwt/jwt")
const _ = require("lodash")
const router = Router()

router.get("/" , async (req, res) => {
    const token = req.cookies["auth"]
    console.log(req.cookies);
    if( !token ){
        return(
            res
                .status(200)
                .json(
                    {
                        status:"no auth"
                    }
                )
        )
    }
    const obj = reGenerateToken(token)
    const userDb = await user.findById(obj._id)
    if(!userDb){
        return(
            res
                .status(200)
                .json(
                    {
                        status:"no auth"
                    }
                )
        )
    }
    res
        .status(200)
        .json(
            {
                status:"auth",
                user:_.pick(userDb , ["login" , "quizAllRank" , "quizAllTests"])
            }
        )
})

module.exports = router