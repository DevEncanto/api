//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Estoque = require("../mysql/Estoque")
const Item = require("../mysql/Itens")

//Definição do Model Usuários

const EntradaEstoque = database.define('entradas_estoques', {
    id_entrada_estoque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_item: Sequelize.INTEGER,
    id_estoque: Sequelize.INTEGER,
    qtde: Sequelize.DOUBLE

})

EntradaEstoque.belongsTo(Estoque, {
    constraint: true,
    foreignKey: "id_estoque"
})

EntradaEstoque.belongsTo(Item, {
    constraint: true,
    foreignKey: "id_item"
})



module.exports = EntradaEstoque