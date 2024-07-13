//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const Chamado = require("../models/Chamados")
const Mesagens = require("../models/Messagens")
//Importação da função que gera hash da senha.

//Objeto de consultas
const QueryChamado = {

    //Consulta que busca o usuário enviado para cadastro.
    buscarChamadosUsuario: async (idUsuario) => {
        try {
            return await Chamado.findAll({
                where: {
                    idUsuario: idUsuario
                }
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    //Consulta que busca o e-mail enviado para cadastro.
    buscarMensagensChamado: async (idChamado) => {
        try {
            return await Mesagens.findAll({ where: { idChamado: idChamado } })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },

    CadastroChamado: async (idUsuario, motivo) => {
        try {
            return await Chamado.create({
                idUsuario: idUsuario,
                motivo: motivo
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    inserirMensagensChamado: async (idChamado, mensagem, type) => {
        try {
            return await Mesagens.create({
                idChamado: idChamado,
                mensagem: mensagem,
                type: type
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryChamado
