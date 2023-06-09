require("express-async-errors")
require("dotenv").config()
require("./bot").startPolling()
const MONGODB_URL = process.env.MONGODB_URL
const mongoose = require("mongoose")
mongoose.connect(MONGODB_URL)
    .then((event) => {
        console.log(`> mongodb connect to ${event.connection.host}`);
    })
    .catch((event) => {
        console.log(`> mongodb not connect mongo server! , ${event.toString()}`);
    })

const cookieParser = require("cookie-parser")
const cors         = require("cors")
const express      = require("express")
const app          = express()
app.use(cors({ origin: ["http://185.196.213.30:80"]  , credentials:true}))

app.use(express.json())
app.use(cookieParser("quiz"))

const authRouter         = require("./routers/auth")
const dashboartRouter    = require("./routers/dashboart")
const whoamiRouter       = require("./routers/whoami")
const usercontrollRouter = require("./routers/userControll")
const { middlewareUser } = require("./middleware/user")

app.use("/whoami" , whoamiRouter)
app.use("/auth" , authRouter)
app.use("/dashboard" , middlewareUser , dashboartRouter)
app.use("/usercontroll" , middlewareUser , usercontrollRouter)
app.get("/singout" , (req, res) => {
    res
        .clearCookie("auth")
        .status(200)
        .json(
            {
                status:"success",
                message:"profildan chiqildi"
            }
        )
})
app.use((err , req, res , next) => {
    if(err) {
        return(
            res
                .status(400)
                .json(
                    {
                        status:"serverError",
                        message:err.toString()
                    }
                )
        )
    }
    next()
})
app.listen(5000 , () => console.log(`> server started on port 5000`))