//Importação da conexão com o banco de dados.

const database = require("../configuracoes/banco_dados")

const Pessoa = require("../modelos/mysql/Pessoas")
const Fornecedor = require("../modelos/mysql/Fornecedores")
const Areas = require("../modelos/mysql/Areas")
const Categoria_Insumo = require("../modelos/mysql/Categoria_Insumos")
const Insumos = require("../modelos/mysql/Insumos")

//Importação da função que gera hash da senha.

const TryCatch = require("../utilidades/try")

//Objeto de consultas

const excludeDefault = ['createdAt', 'updatedAt']

const BuscarFornecedores = async () => {
    return TryCatch(async () => {
        return await Fornecedor.findAll({
            attributes: {
                exclude: ['inscricao', 'id_pessoa', ...excludeDefault]
            }
        })
    })
}

const BuscarAreas = async () => {
    return TryCatch(async () => {
        return await Areas.findAll({
            attributes: {
                exclude: ['hectares', ...excludeDefault]
            }
        })
    })
}

const BuscarInsumos = async () => {
    return TryCatch(async () => {
        return await Insumos.findAll({
            attributes: {
                exclude: [...excludeDefault]
            }
        })
    })
}
const BuscarCategoriaInsumos = async () => {
    return TryCatch(async () => {
        return await Categoria_Insumo.findAll({
            attributes: {
                exclude: [...excludeDefault]
            }
        })
    })
}

const BuscarModelos = async (Model, exclude = []) => {
    return TryCatch(async () => {
        return await Model.findAll({
            attributes: {
                exclude: [...excludeDefault, ...exclude]
            }
        })
    })
}


module.exports = {
    BuscarFornecedores,
    BuscarAreas,
    BuscarInsumos,
    BuscarCategoriaInsumos,
    BuscarModelos
}
