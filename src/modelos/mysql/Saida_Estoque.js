//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Estoque = require("./Estoque")
const Item = require("./Itens")
const Area = require("./Areas")
//Definição do Model Usuários

const SaidaEstoque = database.define('saidas_estoques', {
    id_saida_estoque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_item: Sequelize.INTEGER,
    id_estoque: Sequelize.INTEGER,
    qtde: Sequelize.DOUBLE

})

SaidaEstoque.belongsTo(Estoque, {
    constraint: true,
    foreignKey: "id_estoque"
})

SaidaEstoque.belongsTo(Item, {
    constraint: true,
    foreignKey: "id_item"
})
SaidaEstoque.belongsTo(Area, {
    constraint: true,
    foreignKey: "id_area"
})


module.exports = SaidaEstoque