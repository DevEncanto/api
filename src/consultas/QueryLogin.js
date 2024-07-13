//Importação da conexão com o banco de dados.
const { Op } = require('sequelize')
const database = require("../configuracoes/banco_dados")

//Importação da model Usuários
const Usuarios = require("../modelos/Usuarios")
const TryCatch = require('../utilidades/try')

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
        return await Usuarios.findOne(
            {
                where: {
                    [Op.or]: [
                        { nome: dataQuery },
                        { email: dataQuery }
                    ]
                }
            })
    })
}

module.exports = { BuscarUsuario }


