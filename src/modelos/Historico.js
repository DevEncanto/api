//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../configuracoes/banco_dados")

//Importação da Model Usuários
const Usuarios = require("./Usuarios")

//Definição do Model Avatar
const Historico = database.define('historicos', {
    idHistorico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    desafio: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    valor: Sequelize.DOUBLE
})

Historico.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "idUsuario"
})

module.exports = Historico