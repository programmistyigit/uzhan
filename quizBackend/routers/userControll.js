const {Router}         = require("express")
const _                = require("lodash")
const userControllValidate = require("../validations/user/userControll")
const user = require("../schema/user")
const bot = require("../bot")

const router = Router()

router.post("/" , async (req, res) => {
    const {value , error} = userControllValidate.validate(_.pick(req.body , ["quizAllRank"]))
    if(error){
        return res.send({status:"warning" , message:"qandedir hatolik boldi sahifani qayta yuklamasangiz sizning ballaringiz yozilmay qolishi mumkun"})
    }

    const user1 = await user.findByIdAndUpdate(req.id , {$inc : {quizAllTests:1 , quizAllRank:value.quizAllRank =="update"? 1 : 0 }} , {new:true})
    res.send({status:"success" , user:_.pick(user1 , ["login" , "quizAllRank" , "quizAllTests"])})
})

router.get("/sendme" , async (req, res)=>{
    const user1 = await user.findById(req.id)
    res.send({})
    bot.emit("sendMe" , JSON.stringify(_.pick(user1 , ["login" , "quizAllRank" , "quizAllTests"])))
})

module.exports = router