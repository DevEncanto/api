//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Lotes = database.define('lotes', {
  id_lote: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: Sequelize.STRING(20),
  hectares: Sequelize.DOUBLE,
  hectares_plant: Sequelize.DOUBLE,
})

module.exports = Lotes