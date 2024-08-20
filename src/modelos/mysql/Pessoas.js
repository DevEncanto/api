//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../../configuracoes/banco_dados")

//Definição do Model Usuários

const Pessoa = database.define('pessoas', {
    id_pessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING(70),
    cpf_cnpj: Sequelize.STRING(25),
    email: Sequelize.STRING(70),
    data_nascimento: Sequelize.STRING(20),
    telefone: Sequelize.STRING(20),
    endereco: Sequelize.TEXT(),
    cep: Sequelize.STRING(15),
    bairro: Sequelize.STRING(70),
    estado: Sequelize.STRING(7),
    estado_civil: Sequelize.STRING(20),
    pix: Sequelize.TEXT(),
    agencia: Sequelize.STRING(15),
    conta: Sequelize.STRING(15),
    banco: Sequelize.STRING(30),
})

module.exports = Pessoa