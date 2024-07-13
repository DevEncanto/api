//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../configuracoes/banco_dados")

//Importação da Model Usuários


//Definição do Model Conta
const Recebimento = database.define('recebimentos', {
    idRecebimento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING(40),
        defaultvalue: ""
    },
    valor: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    origem: {
        type: Sequelize.STRING(150),
        defaultvalue: ""
    },
    status: {
        type: Sequelize.STRING(150),
        defaultvalue: "À RECEBER"
    }
})

module.exports = Recebimento