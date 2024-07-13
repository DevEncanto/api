const QueryDadosUsuario = require("../../querys/QueryDadosUsuario")
const QueryCadastro = require("../../querys/QueryCadastro")


const geradorTokenConfirmacao = require("../../utils/stringAleatoria")
const enviarEmail = require("../../utils/send-mail")
const { avataresExclusivos, rankingUsuarios, subUsuarios, dadosUsuario } = require("./auxiliar")

const DadosDashboard = async (req, res) => {

    const id = req.body.idUsuario

    let responseUsuario = await dadosUsuario(req, id)
    let responseContas = await QueryDadosUsuario.DadosContas(id)
    let responseSaques = await QueryDadosUsuario.DadosSaques(id)
    let responseRanking = await rankingUsuarios(req)
    let responseAvatares = await avataresExclusivos(id)
    let responseHistorico = await QueryDadosUsuario.buscarHistorico(id)
    let responseSubUsuarios = await subUsuarios(req, id)
    let responseProgramacao = await req.app.locals.manutencaoProgramada

    const limite = req.app.locals.limite * 3

    const data = {
        status: 200,
        usuario: responseUsuario,
        contas: responseContas,
        saques: responseSaques,
        ranking: responseRanking,
        avatares: responseAvatares,
        historico: responseHistorico,
        subUsuarios: responseSubUsuarios,
        limiteDesafios: limite,
        manutencaoProgramada: responseProgramacao
    }

    return res.json(data)
}

const AtualizarPerfil = async (req, res) => {

    const { idUsuario, avatar, nomeCompleto, pix, banco, recebedor } = req.body
    const response = await QueryDadosUsuario.AtualizarPerfil(idUsuario, avatar, nomeCompleto, pix, banco, recebedor)

    if (response) {
        return res.json({
            status: 200,
            message: `Perfil Atualizado com sucesso!`,
            view: "green"
        })
    } else {
        return res.json({
            status: 601,
            message: `Falha ao atualizar o perfil!`,
            view: "red"
        })
    }
}

const gerarTokenTrocaSenha = async (req, res) => {

    const { email } = req.body
    const token = geradorTokenConfirmacao(15)
    const response = await QueryCadastro.VerificarEmail(email)

    if (response.length > 0) {
        const sendEmail = await enviarEmail(email, "Recuperação de Senha", "token-troca-senha", {
            usuario: response[0].nome,
            token: token
        })
        req.app.locals.alteracoes.push({
            id: response[0].idUsuario,
            token: token
        })
        return res.json({
            status: 200,
            message: `Token de confirmação enviado, verifique o seu e-mail!`,
            view: "green"
        })
    } else {
        return res.json({
            status: 401,
            message: `Falha ao solicitar o token de confirmação!`,
            view: "red"
        })
    }
}

const alterarSenhaUsuario = async (req, res) => {
    try {
        const { senha, token } = req.body
        const alteracoes = req.app.locals.alteracoes
        let object = {}

        alteracoes.forEach((alt, index) => {
            if (alt.token === token) {
                object = alt
                object.index = index
                return
            }
        })

        if (object) {
            const response = await QueryDadosUsuario.AtualizarSenha(object.id, senha)
            if (response) {
                req.app.locals.alteracoes = alteracoes.slice(object.index, 1)
                res.json({
                    status: 200,
                    message: "Senha alterada com sucesso!"
                })
            } else {
                return res.json({
                    status: 402,
                    message: "Falha na tentativa de alterar a senha!"
                })
            }
        } else {
            return res.json({
                status: 401,
                message: "Falha na tentativa de alterar a senha!"
            })
        }
    } catch (error) {
        return res.json({
            status: 400,
            message: "Falha na tentativa de alterar a senha!"
        })
    }
}

const validarIndicacao = async (req, res) => {

    const { idUsuario, token } = req.body
    const id = 1

    if (idUsuario <= id) {
        return res.json({
            status: 202,
            message: "Confirmação válida somente para novos usuários!"
        })
    }

    try {
        let response = await QueryDadosUsuario.buscarTokenIndicacao(token)

        if (!response) {
            return res.json({
                status: 201,
                message: "O código informado é inválido!"
            })
        }
        const { codigoResgatado, codigoIndicacao } = await dadosUsuario(req, idUsuario, 1)

        if (codigoResgatado != "") {
            return res.json({
                status: 201,
                message: "Um código de indicação já foi resgatado nessa conta!"
            })
        }
        if (codigoIndicacao === token) {
            return res.json({
                status: 201,
                message: "Não é possível utilizar o seu próprio código de indicação!"
            })
        }

        await QueryDadosUsuario.AtualizarSaldo(idUsuario, 1, "mais")
        await QueryDadosUsuario.inserirHistorico(idUsuario, "indicacao", 1)
        await QueryDadosUsuario.AtualizarCodigo(idUsuario, token)

        return res.json({
            status: 200,
            message: "Código de indicação resgatado com sucesso!"
        })


    } catch (error) {
        return res.json({
            status: 202,
            message: "Falha na tentativa de validar a indicação!"
        })
    }
}


module.exports = {
    DadosDashboard,
    AtualizarPerfil,
    gerarTokenTrocaSenha,
    alterarSenhaUsuario,
    validarIndicacao
} 