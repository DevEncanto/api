const QueryDadosUsuario = require("../../querys/QueryDadosUsuario")
const requestIP = require('request-ip')

const dadosUsuario = async (req, id, retornoDados) => {

    const ipAdress = requestIP.getClientIp(req)
    const data = await QueryDadosUsuario.DadosUsuario(id)

    switch (retornoDados) {
        case 1:
            return {
                codigoResgatado: data.codigoResgatado,
                codigoIndicacao: data.codigoIndicacao
            }
        default:
            return {
                codigoIndicacao: data.codigoIndicacao,
                codigoResgatado: data.codigoResgatado,
                idUsuario: data.idUsuario,
                nome: data.nome,
                email: data.email,
                nomeCompleto: data.nomeCompleto,
                avatar: data.avatar,
                totalSaques: data.totalSaquestotalSaques,
                saldo: data.saldo,
                saldoPendente: data.saldoPendente,
                lucroTotal: data.lucroTotal,
                statusConta: data.statusConta,
                totalDesafios: data.totalDesafios,
                tipoUsuario: data.tipoUsuario,
                pix: data.pix,
                banco: data.banco,
                recebedor: data.recebedor,
                ip: ipAdress
            }
    }
}

const avataresExclusivos = async (id) => {

    let responseAvatares = await QueryDadosUsuario.BuscarAvatares(id)
    let avataresEx = []
    let object = { img1: "", img2: "", img3: "", img4: "", img5: "" }
    let count = 1

    if (responseAvatares.length > 0) {
        responseAvatares.forEach((avatar) => {
            object[`img${count}`] = avatar.avatar
            if (count == 5) {
                avataresEx.push(object)
                object = {
                    img1: "",
                    img2: "",
                    img3: "",
                    img4: "",
                    img5: "",
                }
                count = 1
            } else {
                count++
            }
        })

        avataresEx.push(object)
    }
    return avataresEx
}

const rankingUsuarios = async (req) => {
    let ranking = req.app.locals.tracking
    ranking.sort((a, b) => b.valor - a.valor)
    return ranking.slice(0, ranking.length > 10 ? 10 : ranking.length)
}


const subUsuarios = async (req, id) => {

    let responseSubUsuarios = await QueryDadosUsuario.buscarSubUsuarios(id)
    let novoSubUsuarios = []

    const [subcontas] = req.app.locals.tracking.filter((usuario) => {
        return usuario.idUsuario == id
    })

    responseSubUsuarios.forEach((item, index) => {
        let obj = {
            idSubUsuario: item.idSubUsuario,
            ip: "",
            desafios: 0,
            visibilidade: "visivel"
        }
        if (subcontas) {
            let array = subcontas.subcontas
            array.forEach((ar) => {
                if (item.idSubUsuario == ar.idSubUsuario) {
                    obj.ip = ar.ip
                    obj.desafios = ar.desafios
                }
            })
        }
        novoSubUsuarios.push(obj)
    })
    return novoSubUsuarios
}

module.exports = { avataresExclusivos, rankingUsuarios, subUsuarios, dadosUsuario }