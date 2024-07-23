const { BuscarUsuario } = require("../../consultas/QueryLogin");
const { compare } = require("../../utilidades/criptografia");
const { gerarToken } = require("../../utilidades/jwt");

const loginUsuario = async (req, res) => {

    const { acesso, senha } = req.body

    let error, data, result = false;

    ({ error, data } = await BuscarUsuario(acesso))


    if (error) { return res.json({ status: 999 }) }
    if (!data) {
        return res.json({
            status: 504,
            message: "Os dados fornecidos estão incorretos!"
        })
    }

    if (data.statusConta == "BANIDA") {
        return res.json({
            status: 505,
            message: "A sua conta foi banida por violar nossos termos de uso!"
        })
    }

    const hash = data.senha
    const id = data.idUsuario
    
    result = await compare(senha, hash)

    if (result) {
        return res.json({
            status: 200,
            message: `Login realizado com sucesso`,
            token: await gerarToken(id),
            idUsuario: id
        })
    } else {
        return res.json({
            status: 504,
            message: "Os dados fornecidos estão incorretos!"
        })
    }

}


module.exports = { loginUsuario }