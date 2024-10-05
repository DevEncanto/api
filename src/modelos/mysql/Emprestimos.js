//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Pessoa = require("../mysql/Pessoas")
const Itens = require("../mysql/Itens")

//Definição do Model Usuários

const Emprestimo = database.define('emprestimos', {
  id_emprestimo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_pessoa: Sequelize.INTEGER,
  data_movimentacao: Sequelize.STRING(15),
  data_devolucao: Sequelize.STRING(15),
  qtde: Sequelize.DOUBLE,
  id_item: Sequelize.INTEGER,
  tipo_emprestimo: Sequelize.STRING(40),
  status: {
    type: Sequelize.STRING(40),
    defaultValue: "Não Devolvido"
  }
})

Emprestimo.belongsTo(Pessoa, {
  constraint: true,
  foreignKey: "id_pessoa"
})

Emprestimo.belongsTo(Itens, {
  constraint: true,
  foreignKey: "id_item"
})


module.exports = Emprestimo