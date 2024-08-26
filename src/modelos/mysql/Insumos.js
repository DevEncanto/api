//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

const Categoria_Insumo = require("../mysql/Categoria_Insumos")

//Definição do Model Usuários

const Insumos = database.define('insumos', {
  id_insumo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: Sequelize.STRING(70),
  id_categoria_insumo: Sequelize.INTEGER,
  composicao: Sequelize.TEXT,
  unidade: Sequelize.STRING(8),
  minimo: Sequelize.DOUBLE
})

Insumos.belongsTo(Categoria_Insumo, {
  constraint: true,
  foreignKey: "id_categoria_insumo"
})



module.exports = Insumos