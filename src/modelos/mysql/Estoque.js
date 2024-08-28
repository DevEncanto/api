//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Estoque = database.define('estoques', {
    id_estoque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(70),
        defaultValue: ""
    },
    desc: Sequelize.TEXT,
    id_lote: Sequelize.INTEGER,
    tipo_estoque: Sequelize.STRING(50)
})

module.exports = Estoque