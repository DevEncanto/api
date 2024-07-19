//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

//Importação da model Usuários
const Usuarios = require("../modelos/Usuarios")

//Importação da função que gera hash da senha.

const { hash } = require("../utilidades/criptografia")
const TryCatch = require("../utilidades/try")

//Objeto de consultas
const QueryCadastro = {

    //Consulta que busca o usuário enviado para cadastro.
    VerificarUsuario: async (usuario) => {
        try {
            return await Usuarios.findAll({ where: { nome: usuario } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    VerificarCodigo: async (codigo) => {
        const sql = `select exists (select 1 from usuarios where codigoIndicacao = "${codigo}") as boolean;`
        try {
            const [[{ boolean }]] = await database.query(sql)
            return boolean
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    BuscarEmail: async (idUsuario) => {
        try {
            return await Usuarios.findOne({ where: { idUsuario: idUsuario } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    VerificarSubUsuario: async (usuario) => {
        try {
            return await SubUsuario.findAll({ where: { nome: usuario } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    //Consulta que busca o e-mail enviado para cadastro.
    VerificarEmail: async (email) => {
        try {
            return await Usuarios.findAll({ where: { email: email } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },

    CadastroUsuario: async (usuario, email, senha, isManutencao, codigo) => {
        try {
            return await Usuarios.create({
                nome: usuario,
                senha: await hash(senha),
                email: email,
                avatar: "/pessoa1.png",
                statusConta: isManutencao ? "DESAT.MANUT" : "ATIVA",
                codigoIndicacao: codigo
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    CadastroSubUsuario: async (idUsuario, usuario, qtde) => {
        try {
            return await SubUsuario.create({
                nome: `${usuario}_s${qtde}`,
                idUsuario: idUsuario
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}

const CadastroUsuario = async (usuario, email, senha, codigo) => {
    return TryCatch(async () => {
        return await Usuarios.create({
            nome: usuario,
            senha: await hash(senha),
            email: email,
            avatar: "/pessoa1.png",
            codigoIndicacao: codigo
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
                nome: usuario
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
        await Usuarios.update({ statusConta: status }, {
            where: {
                idUsuario: idUsuario,
            },
        });
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
    AtualizarStatusConta
}
