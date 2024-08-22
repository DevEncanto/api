//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

const Pessoa = require("../mysql/Pessoas")

//Definição do Model Usuários

const Fornecedor = database.define('fornecedores', {
  id_fornecedor: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_pessoa: Sequelize.INTEGER,
  inscricao: {
    type: Sequelize.STRING(30),
    defaultValue: ""
  },
  fantasia: {
    type: Sequelize.STRING(70),
    defaultValue: ""
  }
})

Fornecedor.belongsTo(Pessoa, {
  constraint: true,
  foreignKey: "id_pessoa"
})


module.exports = Fornecedor