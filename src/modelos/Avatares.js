//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../configuracoes/banco_dados")

//Importação da Model Usuários
const Usuarios = require("./Usuarios")

//Definição do Model Avatar
const Avatar = database.define('avatares', {
    idAvatar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING(30),
        allowNull: false,
    }
})

Avatar.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "idUsuario"
})

module.exports = Avatar