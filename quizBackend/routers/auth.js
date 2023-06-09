const { Router } = require("express")
const singInRouter = require("./auth/singIn")
const singUpRouter = require("./auth/singUp")

const router = Router()
router.use("/singup" , singUpRouter)
router.use("/singin" , singInRouter)


module.exports = router