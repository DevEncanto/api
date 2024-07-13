const { initialize } = require("./auxiliar")

const MiddlewareRotas = (req, res, next) => {

    const config = initialize(req)
    let location
    let isToken
    let userLocated = false

    config.tracking.forEach((track, index) => {
        if (track.token === config.token) {
            location = index
            isToken = true
            return
        }
    })

    if (!isToken) {
        return res.json({
            status: 400,
            message: "Realize uma tarefa para realizar a confirmação!"
        })
    }

    const usuario = config.tracking[location]

    const [subUsuario] = usuario.subcontas.filter((subconta) => {
        return subconta.token == config.token
    })

    const Mapa = req.app.locals.map[`R${subUsuario.rota}${config.rota}`]

    Mapa.forEach((id) => {
        if (subUsuario.idSubUsuario == id) {
            return userLocated = true
        }
    })

    if (userLocated) {
        return res.json({
            status: 400,
            message: "Realize uma tarefa para realizar a confirmação!"
        })
    } else {
        req.body.locationUsuario = location
        req.body.isToken = isToken
        req.body.locationSubUsuario = subUsuario.location
        next()
    }
}

module.exports = { MiddlewareRotas }