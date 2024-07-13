const middlewareRotas = async (req, res, next) => {
    const token = req.body.token
    const tracking = req.app.locals.tracking
    const referer = req.headers.referer
    const rota = referer.split('/confirmacao/')[1]
   
    let usuario = {}
    let location = 0
    let idUsuario = 0
    let userTask = false

    tracking.forEach((track, index) => {
        if (track.token == token) {
            location = index
            return
        }
    })

    usuario = tracking[location]

    const map = req.app.locals.map[`R${usuario.rota}${rota}`]

    map.forEach((ID) => {
        if (usuario.idUsuario == ID) {
            return userTask = true
        }
    })

    if (userTask) {
        return res.json({
            status: 400,
            message: "Realize uma tarefa para realizar a confirmação!"
        })
    } else {
        next()
    }

}

module.exports = { middlewareRotas }