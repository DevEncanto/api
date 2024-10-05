//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Tipo_Movimentacoes = database.define('tipos_movimentacoes', {
    id_tipo_movimentao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(70),
        defaultValue: ""
    }
})

module.exports = Tipo_Movimentacoes