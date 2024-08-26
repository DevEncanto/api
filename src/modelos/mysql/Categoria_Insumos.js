//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Categoria_Insumo = database.define('categorias_insumos', {
    id_categoria_insumo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING(70),
    descricao: Sequelize.TEXT
})

module.exports = Categoria_Insumo