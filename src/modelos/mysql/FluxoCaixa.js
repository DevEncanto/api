//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

const Entrada = require("./Recebimento")
const Saida = require("./Saques")

//Importação da Model Usuários


//Definição do Model Conta
const FluxoCaixa = database.define('fluxocaixa', {
    idLancamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idEntrada: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    idSaida: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    desc: {
        type: Sequelize.STRING(""),
        defaultvalue: ""
    },
})

FluxoCaixa.belongsTo(Entrada, {
    constraint: true,
    foreignKey: "idEntrada"
})

FluxoCaixa.belongsTo(Saida, {
    constraint: true,
    foreignKey: "idSaida"
})

module.exports = FluxoCaixa