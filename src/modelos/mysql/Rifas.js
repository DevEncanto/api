//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Importação da Model Usuários
const Rifas = database.define('rifas', {
    idRifa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    premio: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull: false,
    },
    titulo: {
        type: Sequelize.STRING(""),
        defaultvalue: "",
        allowNull: false,
    },
    data_inicio: {
        type: Sequelize.STRING(""),
        defaultvalue: "",
        allowNull: false,
    },
    data_fim: {
        type: Sequelize.STRING(""),
        defaultvalue: "",
        allowNull: false,
    },
    link_sorteio: {
        type: Sequelize.TEXT,
        defaultvalue: "",
        allowNull: false,
    },
    valor: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull: false,
    },
})


module.exports = Rifas
