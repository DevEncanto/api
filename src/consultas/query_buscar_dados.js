//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

const Pessoa = require("../modelos/mysql/Pessoas")
const Fornecedor = require("../modelos/mysql/Fornecedores")
const Areas = require("../modelos/mysql/Areas")

//Importação da função que gera hash da senha.

const TryCatch = require("../utilidades/try")

//Objeto de consultas

const BuscarFornecedores = async () => {
    return TryCatch(async () => {
        return await Fornecedor.findAll({
            attributes: {
                exclude: ['inscricao', 'id_pessoa', 'createdAt', 'updatedAt']
            }
        })
    })
}

const BuscarAreas = async () => {
    return TryCatch(async () => {
        return await Areas.findAll({
            attributes: {
                exclude: ['hectares',  'createdAt', 'updatedAt']
            }
        })
    })
}

module.exports = {
    BuscarFornecedores,
    BuscarAreas
}
