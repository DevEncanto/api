//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Etiqueta = database.define('etiquetas', {
    id_etiqueta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    etiqueta: {
        type: Sequelize.STRING(12),
        defaultValue: ""
    }
})



module.exports = Etiqueta