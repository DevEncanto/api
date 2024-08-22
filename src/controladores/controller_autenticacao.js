const { VerificarUsuario, CadastroUsuario } = require("../consultas/query_cadastro")
const { BuscarUsuario, BuscarPermissoes } = require("../consultas/QueryLogin")
const { compare } = require("../utilidades/criptografia")
const DadosIniciais = require("../utilidades/dados_iniciais")
const { gerarToken, tokenPayload, validarToken } = require("../utilidades/jwt")

const cadastroUsuario = async (req, res) => {
    const { usuario, senha } = req.body;

    ({ error, data } = await VerificarUsuario(usuario))

    if (error) { return res.json({ status: 402, message: "Falha ao cadastrar o usuário!" }) }
    if (data) {
        return res.json({
            status: 505,
            message: "Usuário já está em uso!"
        })
    }

    ({ error, data } = await CadastroUsuario(usuario, senha))

    if (error) { return res.json({ status: 403, message: "Falha ao cadastrar o usuário!" }) }

    if (data) {
        return res.json({
            status: 200,
            message: "Usuário cadastrado com sucesso!"
        })
    } else {
        return res.json({
            status: 404,
            message: "Falha ao cadastrar o usuário!"
        })
    }

}

const loginUsuario = async (req, res) => {
    const { acesso, senha } = req.body;
    ({ error, data } = await BuscarUsuario(acesso));

    let permissoes = []

    if (error || data == null) {
        return res.json({
            status: 401,
            message: "Falha ao realizar o login!"
        });
    }

    const usuario = data;
    const isSenhaCorreta = await compare(senha, usuario.senha);

    if (isSenhaCorreta) {
        const token = await gerarToken(usuario.idUsuario);
        const { exp } = await tokenPayload(token)

        const dados_iniciais = await DadosIniciais(data.id_usuario)

        return res.json({
            status: 200,
            message: "Login realizado com sucesso",
            token,
            idUsuario: usuario.idUsuario,
            expires: exp,
            permissoes: [...permissoes],
            dados: dados_iniciais
        });
    } else {
        return res.json({
            status: 405,
            message: "Os dados fornecidos estão incorretos!"
        });
    }
};

const ValidarToken = async (req, res) => {
    try {
        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader.split(" ")[1]

        if (await validarToken(token)) {
            res.json({
                message: "Token válido!",
                status: true
            })
        } else {
            res.json({
                message: "Token inválido!",
                status: false
            })
        }
    } catch (error) {
        res.json({
            message: "Token inválido!",
            status: false
        })
    }
}

module.exports = {
    cadastroUsuario,
    loginUsuario,
    ValidarToken
}