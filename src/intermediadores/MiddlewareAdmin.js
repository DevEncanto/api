const {     tokenPayload, validarToken } = require("../utils/jwt")

const MiddlewareAdmin = async (req, res, next) => {
    try {
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader.split(" ")[1]

        if (await validarToken(token)) {
                next()
        } else {
          
        }
    } catch (error) {
       
    }
}
module.exports = MiddlewareAdmin