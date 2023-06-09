const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    login :{ type : String , required : true},
    password : { type : String , required : true},
    quizAllRank : { type : Number , default : 0},
    quizAllTests : { type : Number , default : 0}
} , { timestamps : true })


module.exports = model("user" , userSchema)