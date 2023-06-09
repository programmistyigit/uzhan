const jwt = require("jsonwebtoken")

module.exports.generateToken = paylod => { return jwt.sign(paylod , "salom") } 
module.exports.reGenerateToken = token => { return jwt.verify(token , "salom") }
