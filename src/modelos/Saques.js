//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../configuracoes/banco_dados")

//Importação da Model Usuários
const Usuarios = require("./Usuarios")

//Definição do Model Conta
const Saque = database.define('saques', {
    idSaque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    pix: {
        type: Sequelize.STRING(100),
        defaultValue: ""
    },
    banco: {
        type: Sequelize.STRING(40),
        defaultValue: ""
    },
    recebedor: {
        type: Sequelize.STRING(100),
        defaultValue: ""
    },
    status: {
        type: Sequelize.STRING(15),
        defaultValue: "PENDENTE"
    },
    valor: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
})

//Criação do relacionamento entre conta e plataforma (idPlataforma)


//Criação do relacionamento entre conta e usuarios (idUsuario)

Saque.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "idUsuario"
})

module.exports = Saque