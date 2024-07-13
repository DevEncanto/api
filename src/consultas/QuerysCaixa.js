//Importação da conexão com o banco de dados.

const database = require("../db")

//Importação da model Usuários
const FluxoCaixa = require("../models/FluxoCaixa")

const { QueryFluxoCaixa } = require("../querys/QuerySQL")
//Objeto de consultas

const QueryCaixa = {

    //Consulta que busca o usuário enviado para login.

    buscarFluxoCaixa: async () => {
        try {
            return await database.query(QueryFluxoCaixa)
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    inserirSaida: async (idSaque, descricao) => {
        try {
            return await FluxoCaixa.create({
                idSaida: idSaque,
                tipo: "SAIDA", 
                desc: descricao
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    inserirEntrada: async (idRecebimento, descricao) => {
        try {
            return await FluxoCaixa.create({
                idEntrada: idRecebimento,
                tipo: "ENTRADA", 
                desc: descricao
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}



module.exports = QueryCaixa


