const geradorTokenConfirmacao = require("../../utils/stringAleatoria")

const initialize = (req) => {

    const IPs = req.app.locals.IPs
    const idUsuario = req.body.idUsuario
    const avatar = req.body.avatar
    const dificuldade = req.body.dificuldade
    const nome = req.body.usuario
    const limite = req.app.locals.limite
    const rotas = req.app.locals.rotas

    return {
        IPs: IPs,
        idUsuario: idUsuario,
        avatar: avatar,
        dificuldade: dificuldade,
        nome: nome,
        limite: limite,
        rotas: rotas
    }
}

const valorDificuldade = (dificuldade) => {
    switch (dificuldade) {
        case "facil": return 0.010
        case "medio": return 0.015
        case "dificil": return 0.020
    }
}

const buscarUsuario = (req, idUsuario) => {
    let isUsuario = false
    let location = undefined

    req.app.locals.tracking.forEach((track, index) => {
        if (track.idUsuario == idUsuario) {
            location = index
            isUsuario = true
            return
        }
    })

    return {
        isUsuario: isUsuario,
        location: location
    }
}

const tokenConfirmacao = (req) => {
    let token = ""
    let isToken = true

    while (isToken) {
        token = geradorTokenConfirmacao(10)
        req.app.locals.tracking.forEach((track) => {
            if (track.token == token) {
                return
            }
        })
        isToken = false
    }

    return token
}

const verificarIp = (IPs, usuario, ipAdress) => {
    let isIp = false
    IPs.forEach((IP) => {
        if (IP.ip == ipAdress && usuario.idUsuario != IP.idUsuario) {
            isIp = true
            return
        }
    })
    return isIp
}

const adicionarUsuario = (req, body, token, dificuldade) => {
    req.app.locals.tracking.push({
        idUsuario: body.idUsuario,
        usuario: body.usuario,
        token: token,
        ultimaDificuldade: dificuldade,
        avatar: body.avatar,
        valor: 0,
        desafios: 0,
        subcontas: [

        ]
    })


    return req.app.locals.tracking.length - 1
}

const adicionarSubUsuario = async (req, usuario, ipAdress, body, token) => {
    const size = req.app.locals.tracking[usuario.location].subcontas.length
    req.app.locals.tracking[usuario.location].subcontas.push({
        idSubUsuario: body.idSubUsuario,
        rota: 1,
        clicks: 0,
        ip: ipAdress,
        desafios: 0,
        status: "DS",
        token: token,
        location: size
    })
    req.app.locals.tracking[usuario.location].token = token
    req.app.locals.IPs.push({
        idUsuario: body.idUsuario,
        idSubUsuario: body.idSubUsuario,
        ip: ipAdress
    })
}

const verificarIPsUsuario = (req, usuario, ipAdress, body) => {
    const jsonUsuario = req.app.locals.tracking[usuario.location]
    let obj = {
        isIPSubconta: false,
        index: -1
    }
    jsonUsuario.subcontas.forEach((subconta, index) => {
        if (subconta.ip == ipAdress && subconta.idSubUsuario == body.idSubUsuario) {
            obj.isIPSubconta = true
            obj.index = index
            return
        }
    })
    return obj
}

const verificarIps = (req, ipAdress) => {

    const IPs = req.app.locals.IPs
    let isIpDetected = false
    IPs.forEach((ip) => {
        if (ip.ip === ipAdress) {
            isIpDetected = true
            return
        }
    })

    return isIpDetected
}

const verificarLimitesSubContas = (req, index, usuario, config) => {
    const subcontas = req.app.locals.tracking[usuario.location].subcontas
    let isLimite = false
    let indexSubConta = subcontas.length - 1
    subcontas.forEach((subconta, index) => {
        if (subconta.desafios < config.limite && subconta.status != "PL") {
            isLimite = true
            indexSubConta = index
            return
        }
    })
    return {
        isLimite: isLimite,
        indexSubConta: indexSubConta
    }
}


const gerenciadorDeLinks = (req, res, config, usuario, index, tokenValidacao) => {

    let nRota = req.app.locals.tracking[usuario.location].subcontas[index].rota - 1
    let clicks = req.app.locals.tracking[usuario.location].subcontas[index].clicks

    if (nRota + 1 > config.limite) {
        return {
            nRota: nRota,
            posicao: `${config.dificuldade}${clicks}`,
            limite: true
        }
    }
    if (clicks + 1 > 3) {
        req.app.locals.tracking[usuario.location].subcontas[index].rota += 1
        req.app.locals.tracking[usuario.location].subcontas[index].clicks = 0
        nRota += 1
        clicks = 1
        if (nRota + 1 > config.limite) {
            return {
                nRota: nRota,
                posicao: `${config.dificuldade}${clicks}`,
                limite: true
            }
        }
    } else {
        clicks += 1
    }

    req.app.locals.tracking[usuario.location].ultimaDificuldade = config.dificuldade
    req.app.locals.tracking[usuario.location].token = tokenValidacao
    req.app.locals.tracking[usuario.location].subcontas[index].token = tokenValidacao
    req.app.locals.tracking[usuario.location].avatar = config.avatar
    const statusSub = req.app.locals.tracking[usuario.location].subcontas[index].status
    return {
        nRota: nRota,
        posicao: `${config.dificuldade}${clicks}`,
        limite: false,
        statusSub: statusSub
    }
}

const verificarSubUsuarios = (req, idSubUsuario) => {
    let isIdSubUsuario = false
    req.app.locals.IPs.forEach((IP) => {
        if (IP.idSubUsuario === idSubUsuario) {
            isIdSubUsuario = true
            return
        }
    })
    return isIdSubUsuario
}



module.exports = {
    buscarUsuario,
    initialize,
    valorDificuldade,
    tokenConfirmacao,
    verificarIp,
    adicionarUsuario,
    adicionarSubUsuario,
    verificarIPsUsuario,
    verificarIps,
    verificarLimitesSubContas,
    gerenciadorDeLinks,
    verificarSubUsuarios
}
