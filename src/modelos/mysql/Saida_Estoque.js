//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")
const Estoque = require("./Estoque")
const Item = require("./Itens")
const Area = require("./Areas")
const Tipo_Saida = require("./Tipos_Saida")

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
    qtde: Sequelize.DOUBLE,
    id_area: Sequelize.INTEGER,
    id_etiqueta: Sequelize.INTEGER,
    id_tipo_saida: Sequelize.INTEGER
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

SaidaEstoque.belongsTo(Tipo_Saida, {
    constraint: true,
    foreignKey: "id_tipo_saida"
})

module.exports = SaidaEstoque