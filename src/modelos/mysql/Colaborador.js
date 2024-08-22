//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Pessoa = require("../mysql/Pessoas")

const Colaborador = database.define('colaboradores', {
  id_colaborador: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_pessoa: Sequelize.INTEGER,
  salario: Sequelize.DOUBLE,
  id_funcao: Sequelize.INTEGER

})

Colaborador.belongsTo(Pessoa, {
  constraint: true,
  foreignKey: "id_pessoa"
})




module.exports = Colaborador