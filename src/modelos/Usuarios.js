//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../configuracoes/banco_dados")

//Definição do Model Usuários

const Usuario = database.define('usuarios', {
    idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    senha: Sequelize.STRING(70),
    email: Sequelize.STRING(70),
    nome: Sequelize.STRING(70),
    nomeCompleto: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    avatar: {
        type: Sequelize.STRING(30),
        defaultValue: "/default.png"
    },
    totalSaques: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    saldo: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    saldoPendente: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    lucroTotal: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    statusConta: {
        type: Sequelize.STRING,
        defaultValue: "ATIVA"
    },
    totalDesafios: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tipoUsuario: {
        type: Sequelize.STRING,
        defaultValue: "USER"
    },
    codigoIndicacao: {
        type: Sequelize.STRING(20),
        defaultValue: ""
    },
    codigoResgatado: {
        type: Sequelize.STRING(20),
        defaultValue: ""
    },
    pix: {
        type: Sequelize.STRING(100),
        defaultValue: ""
    },
    banco: {
        type: Sequelize.STRING(100),
        defaultValue: ""
    },
    recebedor: {
        type: Sequelize.STRING(100),
        defaultValue: ""
    },
})

module.exports = Usuario