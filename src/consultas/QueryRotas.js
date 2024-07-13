//Importação da conexão com o banco de dados.

const database = require("../db")

const Rotas = require("../models/Rotas")

const QueryRotas = {

    CadastroRota: async (nRota, dificuldade, link, redirect, valor) => {

        try {
            return await Rotas.create({
                nRota: nRota,
                dificuldade: dificuldade,
                link: link,
                redirect: redirect,
                valor: valor
            })
        } catch (error) {
            console.log(error)
            throw "Falha na conexão com o banco de dados - Cadastro Saque!"
        }
    }
}



module.exports = QuerySaque


