const requestIP = require('request-ip')
const {
    ResponseIpAlterado,
    ResponseSemRotas,
    ResponseIpEmUso,
    ResponseFinalizarLimite,
    ResponseIPGerenciador,
    ResponseLimite,
    ResponsePulo
} = require("./Responses")
const {
    initialize,
    buscarUsuario,
    valorDificuldade,
    tokenConfirmacao,
    verificarIp,
    adicionarUsuario,
    adicionarSubUsuario,
    verificarIPsUsuario,
    verificarIps,
    verificarLimitesSubContas,
    gerenciadorDeLinks,
    verificarSubUsuarios,
} = require("./auxiliar")


const ControladorDeRotas = async (req, res) => {

    const body = req.body

    const nRotas = req.app.locals.rotas.length
   
    const ipAdress = requestIP.getClientIp(req)
    // const ipAdress = req.body.ipAdress

    //Verifica se algum IP foi localizado
    if (!ipAdress) {
        return res.json(ResponseIpAlterado)
    }

    //Verifica se existem rotas cadastradas
    if (nRotas > 0) {

        //Captura os dados das variáveis
        const config = initialize(req)

        //Obtem o valor do desafio solicitado
        const valor = valorDificuldade(config.dificuldade)

        //Obtem os dados do usuário
        let usuario = buscarUsuario(req, body.idUsuario)
        //Cria o token de validação
        const tokenValidacao = tokenConfirmacao(req)

        if (!usuario.isUsuario) {
            const isIP = verificarIp(config.IPs, usuario, ipAdress)
            if (isIP) {
                return res.json(ResponseIpEmUso)
            } else {
                const location = adicionarUsuario(req, body, tokenValidacao, config.dificuldade)

                const localUser = {
                    location: location,
                    idUsuario: body.idUsuario,
                    idSubUsuario: body.idSubUsuario
                }
                await adicionarSubUsuario(req, localUser, ipAdress, body, tokenValidacao)

                return res.json({
                    status: 200,
                    message: "Rota localizada!",
                    valor: valor,
                    limite: false,
                    semRota: false,
                    VPN: false,
                    URL: `${config.rotas[0][`${config.dificuldade}1`]}`,
                    token: tokenValidacao,
                    ip: ipAdress
                })
            }
        } else {
            const { isIPSubconta, index } = verificarIPsUsuario(req, usuario, ipAdress, body)
            if (isIPSubconta) {
                const { nRota, posicao, limite, statusSub = "" } = gerenciadorDeLinks(req, res, config, usuario, index, tokenValidacao)
                if (limite) {
                    return res.json(ResponseLimite)
                }
                if (statusSub == "PL") {
                    return res.json(ResponsePulo)
                }
                return res.json({
                    status: 200,
                    message: "Rota localizada!",
                    valor: valor,
                    limite: false,
                    semRota: false,
                    VPN: false,
                    URL: `${config.rotas[nRota][posicao]}`,
                    token: tokenValidacao,
                    ip: ipAdress
                })
            } else {
                if (verificarIps(req, ipAdress)) {
                    return res.json(ResponseIpEmUso)
                }
                const { isLimite, indexSubConta } = verificarLimitesSubContas(req, index, usuario, config)
                if (isLimite && !body.pular) {
                    return res.json(ResponseFinalizarLimite)
                }
                if (body.pular) {
                    req.app.locals.tracking[usuario.location].subcontas[indexSubConta].status = "PL"
                    req.app.locals.tracking[usuario.location].subcontas[indexSubConta].token = ""
                }
                if (verificarSubUsuarios(req, body.idSubUsuario)) {
                    return res.json(ResponseIPGerenciador)
                }
                const localUser = {
                    location: usuario.location,
                    idUsuario: body.idUsuario,
                    idSubUsuario: body.idSubUsuario
                }
                await adicionarSubUsuario(req, localUser, ipAdress, body, tokenValidacao)

                return res.json({
                    status: 200,
                    message: "Rota localizada!",
                    valor: valor,
                    limite: false,
                    semRota: false,
                    VPN: false,
                    URL: `${config.rotas[0][`${config.dificuldade}1`]}`,
                    token: tokenValidacao,
                    ip: ipAdress
                })
            }
        }
    } else {
        return res.json({ ip: ipAdress, ...ResponseSemRotas })
    }
}










module.exports = { ControladorDeRotas }