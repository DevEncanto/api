//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Pessoa = require("./Pessoas")

//Definição do Model Usuários

const Contas_Pagar = database.define('contas_pagar', {
    id_conta_pagar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_compra: Sequelize.INTEGER,
    id_pessoa: Sequelize.INTEGER,
    valor_previsto: Sequelize.DOUBLE,
    valor_compra: Sequelize.DOUBLE,
    valor_pago: Sequelize.DOUBLE,
    data_vencimento: Sequelize.STRING(15),
    data_antecipacao: Sequelize.STRING(15),
    status: Sequelize.STRING(15),
    forma_pagamento: Sequelize.STRING(15),
})

Contas_Pagar.belongsTo(Pessoa, {
  constraint: true,
  foreignKey: "id_pessoa"
})


module.exports = Contas_Pagar