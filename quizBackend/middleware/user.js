const { reGenerateToken } = require("../jwt/jwt")
const user = require("../schema/user")

module.exports.middlewareUser = async (req, res, next) => {
    const token = req.cookies["auth"]
    if (!token) return res.json({ status: "cookieError", message: "cookieda hatolik", redirect: "/" })
    const obj = reGenerateToken(token)
    const userFind = await user.findById(obj._id)
    if (!userFind) {
        return (
            res
                .status(400)
                .json(
                    {
                        status: "errorToken",
                        message: "cookieda hatolik aniqlandi",
                        delete: "auth"
                    }
                )
        )
    }

    req.id = userFind._id
    next()
}