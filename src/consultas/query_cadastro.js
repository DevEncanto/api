//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

//Importação da model Usuários
const Usuarios = require("../modelos/mysql/Usuarios")

//Importação da função que gera hash da senha.

const { hash } = require("../utilidades/criptografia")
const TryCatch = require("../utilidades/try")

//Objeto de consultas

const CadastroUsuario = async (usuario, senha) => {
    return TryCatch(async () => {
        return await Usuarios.create({
            usuario: usuario,
            senha: await hash(senha),
            avatar: "/pessoa1.png",
        })
    })
}

const VerificarEmail = async (email) => {
    return TryCatch(async () => {
        return await Usuarios.findOne({
            where: {
                email: email
            }
        })
    })
}

const VerificarUsuario = async (usuario) => {
    return TryCatch(async () => {
        return await Usuarios.findOne({
            where: {
                usuario: usuario
            }
        })
    })
}

const VerificarCodigo = async (codigo) => {
    return TryCatch(async () => {
        const sql = `select exists (select 1 from usuarios where codigoIndicacao = "${codigo}") as boolean;`
        const [[{ boolean }]] = await database.query(sql)
        return !!boolean
    })
}

const AtualizarStatusConta = async (idUsuario, status) => {
    return TryCatch(async () => {
        return await Usuarios.update({ statusConta: status }, {
            where: {
                idUsuario: idUsuario,
            },
        });
    })
}

const AtualizarSenha = async (idUsuario, senha) => {
    return TryCatch(async () => {
        return await Usuarios.update({ senha: await hash(senha) }, {
            where: {
                idUsuario: idUsuario,
            },
        })
    })
}


const VerificadorCodigoNumerico = async (codigo = 0, codigosCadastro = []) => {
    let result = false

    codigosCadastro.forEach((item) => {
        if (item.codigo == codigo) {
            result = true
            return
        }
    })

    return result
}

module.exports = {
    CadastroUsuario,
    VerificarEmail,
    VerificarUsuario,
    VerificarCodigo,
    VerificadorCodigoNumerico,
    AtualizarStatusConta,
    AtualizarSenha
}
