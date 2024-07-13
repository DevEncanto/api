//Importação da conexão com o banco de dados.

const database = require("../db")

const Saques = require("../models/Saques")


const QuerySaque = {

    CadastroSaque: async (idUsuario, valor, banco, pix, recebedor) => {
        const data = new Date()
        const hoje = data.toLocaleDateString("pt-BR")
        try {
            return await Saques.create({
                idUsuario: idUsuario,
                valor: valor,
                data: hoje,
                banco: banco,
                pix: pix,
                recebedor: recebedor
            })
        } catch (error) {
            throw "Falha na conexão com o banco de dados - Cadastro Saque!"
        }
    }
}



module.exports = QuerySaque


