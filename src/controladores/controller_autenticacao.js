const { VerificarUsuario, CadastroUsuario } = require("../consultas/query_cadastro")
const { BuscarUsuario, BuscarPermissoes } = require("../consultas/QueryLogin")
const { compare } = require("../utilidades/criptografia")
const { gerarToken, tokenPayload } = require("../utilidades/jwt")

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

    ({ error, data } = await BuscarPermissoes(data.id_usuario))

    if (data) {
        data.forEach((permissao) => {
            permissoes.push(permissao.nome)
        })
    }

    if (isSenhaCorreta) {
        const token = await gerarToken(usuario.idUsuario);
        const { exp } = await tokenPayload(token)
        return res.json({
            status: 200,
            message: "Login realizado com sucesso",
            token,
            idUsuario: usuario.idUsuario,
            expires: exp,
            permissoes: [...permissoes]
        });
    } else {
        return res.json({
            status: 405,
            message: "Os dados fornecidos estão incorretos!"
        });
    }
};

module.exports = {
    cadastroUsuario,
    loginUsuario
}