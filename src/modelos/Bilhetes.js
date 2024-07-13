//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../configuracoes/banco_dados")

const Rifas = require("../modelos/Rifas")
const Usuarios = require("../modelos/Usuarios")

//Importação da Model Usuários
const Bilhetes = database.define('bilhetes', {
    idBilhete: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numero: {
        type: Sequelize.STRING(""),
        defaultvalue: "",
        allowNull: false,
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

Bilhetes.belongsTo(Rifas, {
    constraint: true,
    foreignKey: "idRifa"
})

Bilhetes.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "idUsuario"
})


module.exports = Bilhetes
