const { tokenPayload, validarToken } = require("../utils/jwt")

const MiddlewareAdmin = async (req, res, next) => {
    try {
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader.split(" ")[1]

        if (await validarToken(token)) {
            const payload = await tokenPayload(token)
            if (payload.mode == "ADMIN") {
                next()
            } else {
                res.json({
                    status: 601,
                    message: "Token inválido",
                    mode: ""
                })
            }

        } else {
            res.json({
                status: 601,
                message: "Token inválido",
                mode: ""
            })
        }
    } catch (error) {
        res.json({
            status: 601,
            message: "Token inválido",
            mode: ""
        })
    }
}
module.exports = MiddlewareAdmin