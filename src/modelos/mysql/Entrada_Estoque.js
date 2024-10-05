//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Estoque = require("../mysql/Estoque")
const Item = require("../mysql/Itens")
const Fornecedor = require("./Fornecedores")
const Etiqueta = require("./Etiquetas")
const Compras = require("./Compras")

//Definição do Model Usuários

const EntradaEstoque = database.define('entradas_estoques', {
    id_entrada_estoque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_entrada: Sequelize.STRING(20),
    id_item: Sequelize.INTEGER,
    id_estoque: Sequelize.INTEGER,
    id_compra: Sequelize.INTEGER,
    qtde: Sequelize.DOUBLE,
    valor_unitario: Sequelize.DOUBLE,
    descontos: Sequelize.DOUBLE,
    id_fornecedor: Sequelize.INTEGER,
    id_etiqueta: Sequelize.INTEGER,
    tipo_entrada: {
        type: Sequelize.STRING(40),
        defaultValue: "compra"
    }
})

EntradaEstoque.belongsTo(Estoque, {
    constraint: true,
    foreignKey: "id_estoque"
})

EntradaEstoque.belongsTo(Item, {
    constraint: true,
    foreignKey: "id_item"
})

EntradaEstoque.belongsTo(Fornecedor, {
    constraint: true,
    foreignKey: "id_fornecedor"
})

EntradaEstoque.belongsTo(Etiqueta, {
    constraint: true,
    foreignKey: "id_etiqueta"
})

EntradaEstoque.belongsTo(Compras, {
    constraint: true,
    foreignKey: "id_compra"
})

module.exports = EntradaEstoque