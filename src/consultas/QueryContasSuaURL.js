//Importação da conexão com o banco de dados.

const database = require("../db")

const QueryContasSuaURL = {
    BuscarContas: async (inicio, fim) => {
        const sql = `select idConta, senha, email from contasLinks where idConta >= ${inicio} and idConta<=${fim}`
        try {
            const [result] = await database.query(sql)
            return result
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    },
    AtualizarSaldos: async (saldo, idConta) => {
        const sql = `update contasLinks set saldo = ${parseFloat(saldo)} where idConta = ${idConta}`
        try {
            const [result] = await database.query(sql)
            return result
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados!"
        }
    }
}

module.exports = QueryContasSuaURL
