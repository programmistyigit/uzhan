const Telegram = require("node-telegram-bot-api")
const bot = new Telegram("5631771796:AAF_d_DOxcR4U4NcBMllgyY3L_sgp0tlYjg")
let adminId = ''
bot.on("message" , (msg)=>{
    if(msg.text.toLowerCase() == 'i am admin'){
        adminId =msg.chat.id
        bot.sendMessage(adminId , "hello admin")
    }
})

bot.on("sendMe" , (user) => {
    if(adminId != ""){
        bot.sendMessage(adminId , user.toString())
    }
})

module.exports = bot