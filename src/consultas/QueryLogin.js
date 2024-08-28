//Importação da conexão com o banco de dados.
const { Op } = require('sequelize')
const database = require("../configuracoes/banco_dados")

//Importação da model Usuários
const Usuarios = require("../modelos/mysql/Usuarios")
const TryCatch = require('../utilidades/try')
const { ListarPermissoes, ListarEstoques } = require('./QuerySQL')

//Objeto de consultas
const QueryLogin = {

    //Consulta que busca o usuário enviado para login.
    BuscarUsuario: async (dataQuery) => {
        try {
            return await Usuarios.findOne(
                {
                    where: {
                        [Op.or]: [
                            { nome: dataQuery },
                            { email: dataQuery }
                        ]
                    }
                })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}

const BuscarUsuario = async (dataQuery) => {
    return TryCatch(async () => {
        return await Usuarios.findOne({
            where: {
                usuario: dataQuery
            }
        })
    })
}

const BuscarPermissoes = async (id_usuario) => {
    return TryCatch(async () => {
        const [result] = await database.query(`${ListarPermissoes}${id_usuario}`)
        return result
    })
}

const BuscarEstoques = async (id_usuario) => {
    return TryCatch(async () => {
        const [result] = await database.query(ListarEstoques)
        return result
    })
}

module.exports = { BuscarUsuario, BuscarPermissoes, BuscarEstoques }


