const { Router } = require("express")
const user       = require("../schema/user")
const _          = require("lodash")

const router = Router()
router.get("/" , async (req , res) => {
    const findMe  = await user.findById(req.id)
    const allUser = await user.find().lean()

    const alluserSatatus = allUser.filter(users => users._id != findMe._id ).map((u) => _.pick(u , ["login" , "quizAllRank" , "quizAllTests"]))

    res
        .status(200)
        .json(
            {
                afterUser : alluserSatatus
            }
        )
})

module.exports = router