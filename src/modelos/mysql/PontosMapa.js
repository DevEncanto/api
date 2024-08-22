//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários
const Area = require("../mysql/Areas")


const PontosMapa = database.define('pontos_mapa', {
  id_ponto: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ponto: Sequelize.TEXT,
  id_area: Sequelize.INTEGER
})

PontosMapa.belongsTo(Area, {
  constraint: true,
  foreignKey: "id_area"
})

module.exports = PontosMapa