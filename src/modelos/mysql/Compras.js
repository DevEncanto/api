//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Fornecedor = require("../mysql/Fornecedores")
//Definição do Model Usuários

const Compras = database.define('compras', {
    id_compra: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_fornecedor: Sequelize.INTEGER,
    data_emissao: Sequelize.STRING(15),
    valor: Sequelize.DOUBLE,
    prazo_inicial: Sequelize.INTEGER,
    prazo_geral: Sequelize.INTEGER,
    parcelamento: Sequelize.INTEGER,
    documento: Sequelize.STRING(40)
})

Compras.belongsTo(Fornecedor, {
    constraint: true,
    foreignKey: "id_fornecedor"
})

module.exports = Compras